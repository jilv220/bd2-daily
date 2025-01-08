import { Suspense } from "react";
import { useLoaderData } from "react-router";
import { useSession } from "~/components/session-provider";
import { fetchTaskCounts } from "./fetch";
import { TaskListContainer } from "./task-list-container";
import { TaskListSkeleton } from "./task-list-skeleton";

export function meta() {
	return [
		{ title: "BrownDust2 Daily" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const data = await fetchTaskCounts();
	return data;
}

export default function Home() {
	const counts = useLoaderData<typeof clientLoader>();
	const session = useSession();

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
					<h2 className="pb-1">Essential</h2>
					<Suspense fallback={<TaskListSkeleton length={counts.essential} />}>
						<TaskListContainer userId={session.user.id} category="essential" />
					</Suspense>
				</section>

				<section>
					<h2 className="pb-1">Optional</h2>
					<Suspense fallback={<TaskListSkeleton length={counts.optional} />}>
						<TaskListContainer userId={session.user.id} category="optional" />
					</Suspense>
				</section>
			</div>
		</>
	);
}
