import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, supabase } from "~/clients";
import { useSession } from "~/components/session-provider";
import { Checkbox } from "~/components/ui/checkbox";
import {
	type DailyTasks,
	fetchDailyTasks,
	toggleDailyTaskStatus,
} from "./fetch";

export function meta() {
	return [
		{ title: "BrownDust2 Daily" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

const dailyTaskQuery = (userId: string | undefined) => ({
	queryKey: ["tasks", userId],
	queryFn: async () => fetchDailyTasks(),
});

export default function Home() {
	const session = useSession();
	const { data, isPending } = useQuery({
		...dailyTaskQuery(session?.user?.id),
		enabled: Boolean(session),
	});

	const mutation = useMutation({
		mutationFn: ({
			taskId,
			currentStatus,
		}: { taskId: string; currentStatus: boolean }) =>
			toggleDailyTaskStatus(taskId, currentStatus),
		onMutate: async ({
			taskId,
			currentStatus,
		}: { taskId: string; currentStatus: boolean }) => {
			await queryClient.cancelQueries({
				queryKey: ["tasks", session?.user?.id],
			});

			const previousData = queryClient.getQueryData<DailyTasks>([
				"tasks",
				session?.user?.id,
			]);

			queryClient.setQueryData(
				["tasks", session?.user?.id],
				(old: DailyTasks) => {
					return old.map((t) =>
						t.tasks.id === taskId ? { ...t, is_finished: !currentStatus } : t,
					);
				},
			);
			return { previousData };
		},
		onError: (err, vars, context) => {
			if (context) {
				queryClient.setQueryData(
					["tasks", session?.user?.id],
					context.previousData,
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks", session?.user?.id] });
		},
	});

	if (!session)
		return (
			<div>
				BrownDust2 Daily is an app that you can use to keep track of your daily
				tasks
			</div>
		);
	if (isPending) return <div>is loading...</div>;

	return (
		<>
			{data?.map((d) => (
				<div
					className="flex items-center space-x-2 justify-between"
					key={d.tasks.id}
				>
					<Label>{d.tasks.title}</Label>
					<Checkbox
						checked={d.is_finished}
						onClick={() => {
							mutation.mutate({
								taskId: d.tasks.id,
								currentStatus: d.is_finished,
							});
						}}
					/>
				</div>
			))}
		</>
	);
}
