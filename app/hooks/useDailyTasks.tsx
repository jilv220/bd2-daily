import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/clients";
import { useSession } from "~/components/session-provider";
import {
	type DailyTasks,
	fetchDailyTasks,
	toggleDailyTaskStatus,
} from "~/home/fetch";

export function useDailyTasks() {
	const session = useSession();

	// Fetch
	const { data, isFetching } = useQuery({
		queryKey: ["tasks", session?.user?.id],
		queryFn: fetchDailyTasks,
		enabled: Boolean(session),
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
				queryKey: ["tasks", session?.user?.id],
			});

			// Snapshot the previous data
			const previousData = queryClient.getQueryData<DailyTasks>([
				"tasks",
				session?.user?.id,
			]);

			// Optimistically update the cache
			queryClient.setQueryData<DailyTasks>(
				["tasks", session?.user?.id],
				(old) =>
					old
						? old.map((t) =>
								t.tasks.id === taskId
									? { ...t, is_finished: !currentStatus }
									: t,
							)
						: [],
			);

			return { previousData };
		},
		onError: (_err, _vars, context) => {
			// Revert to the previous data if mutation fails
			if (context?.previousData) {
				queryClient.setQueryData(
					["tasks", session?.user?.id],
					context.previousData,
				);
			}
		},
		onSettled: () => {
			// Re-fetch after mutation
			queryClient.invalidateQueries({ queryKey: ["tasks", session?.user?.id] });
		},
	});

	// Helper to trigger the mutation
	const toggleTaskStatus = (taskId: string, currentStatus: boolean) => {
		mutation.mutate({ taskId, currentStatus });
	};

	return {
		session,
		data,
		isPending: isFetching,
		toggleTaskStatus,
	};
}
