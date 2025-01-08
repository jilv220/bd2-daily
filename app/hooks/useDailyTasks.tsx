import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient } from "~/clients";
import type { TaskCategory } from "~/database.types";
import {
	type DailyTasks,
	type TaskPostion,
	fetchDailyTasks,
	toggleDailyTaskStatus,
	updateTaskPositions,
} from "~/home/fetch";

export function useDailyTasks() {
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
					t.task_id === taskId ? { ...t, is_finished: !currentStatus } : t,
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

	const reorderMutation = useMutation({
		mutationFn: ({
			newOrder,
			category,
		}: {
			newOrder: TaskPostion[];
			category: TaskCategory;
		}) => {
			return updateTaskPositions(newOrder, category);
		},
		onMutate: async ({ newOrder, category }) => {
			await queryClient.cancelQueries({
				queryKey: ["tasks"],
			});
			const previousData = queryClient.getQueryData<DailyTasks>(["tasks"]);

			// Create a position lookup from newOrder
			const positionMap = new Map(
				newOrder.map(({ taskId, position }) => [taskId, position]),
			);

			// Optimistically update positions
			queryClient.setQueryData<DailyTasks>(["tasks"], (old) => {
				if (!old) return old;

				return old.map((task) => {
					const newPosition = positionMap.get(task.task_id);
					if (task.category === category && newPosition !== undefined) {
						return { ...task, position: newPosition };
					}
					return task;
				});
			});

			return { previousData };
		},
		onError: (_err, _vars, context) => {
			if (context?.previousData) {
				queryClient.setQueryData(["tasks"], context.previousData);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["tasks"],
			});
		},
	});

	return {
		data,
		toggleTaskStatus: mutation.mutate,
		updateTaskPositions: reorderMutation.mutate,
		isUpdatingPositions: reorderMutation.isPending,
	};
}
