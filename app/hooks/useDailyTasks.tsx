import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient } from "~/clients";
import { useSession } from "~/components/session-provider";
import {
	type DailyTasks,
	fetchDailyTasks,
	toggleDailyTaskStatus,
} from "~/home/fetch";

export function useDailyTasks(userId: string | undefined) {
	// Fetch
	const { data } = useSuspenseQuery({
		queryKey: ["tasks"],
		queryFn: fetchDailyTasks,
	});

	// Mutate
	const mutation = useMutation({
		mutationFn: ({
			taskId,
			currentStatus,
		}: {
			taskId: string;
			currentStatus: boolean;
		}) => toggleDailyTaskStatus(taskId, currentStatus),
		onMutate: async ({ taskId, currentStatus }) => {
			await queryClient.cancelQueries({
				queryKey: ["tasks"],
			});

			// Snapshot the previous data
			const previousData = queryClient.getQueryData<DailyTasks>(["tasks"]);

			// Optimistically update the cache
			queryClient.setQueryData<DailyTasks>(["tasks"], (old) => {
				return old?.map((t) =>
					t.tasks.id === taskId ? { ...t, is_finished: !currentStatus } : t,
				);
			});

			return { previousData };
		},
		onError: (_err, _vars, context) => {
			// Revert to the previous data if mutation fails
			if (context?.previousData) {
				queryClient.setQueryData(["tasks"], context.previousData);
			}
		},
	});

	return {
		data,
		toggleTaskStatus: mutation.mutate,
	};
}
