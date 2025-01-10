import { useEffect } from "react";
import { queryClient, supabase } from "~/clients";
import { useSession } from "~/components/session-provider";
import { TaskListContainer } from "./task-list-container";

export function meta() {
	return [
		{ title: "BrownDust2 Daily" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	const session = useSession();

	// Listen to daily reset
	useEffect(() => {
		if (!session?.user.id) return;

		const channel = supabase
			.channel("supabase-realtime")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "user_tasks",
					filter: `user_id=eq.${session.user.id}`,
				},
				(_payload) => {
					queryClient.invalidateQueries({
						queryKey: ["tasks"],
					});
				},
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [session?.user.id]);

	if (!session) {
		return (
			<div>
				BrownDust2 Daily is an app that you can use to keep track of your daily
				tasks.
			</div>
		);
	}

	return (
		<>
			<div className="space-y-4">
				<section>
					<TaskListContainer category="essential" />
				</section>

				<section>
					<TaskListContainer category="optional" />
				</section>
			</div>
		</>
	);
}
