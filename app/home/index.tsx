import { useSession } from "~/components/session-provider";
import { useDailyTasks } from "~/hooks/useDailyTasks";
import { TaskList } from "./task-list";

export function meta() {
	return [
		{ title: "BrownDust2 Daily" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	const session = useSession();
	const { data, isPending, toggleTaskStatus } = useDailyTasks(session?.user.id);

	if (!session) {
		return (
			<div>
				BrownDust2 Daily is an app that you can use to keep track of your daily
				tasks.
			</div>
		);
	}

	if (isPending) {
		return <div>is loading...</div>;
	}

	return (
		<>
			<TaskList
				className="pb-2"
				title="Essential"
				tasks={data}
				isEssential={true}
				onToggle={toggleTaskStatus}
			/>
			<TaskList
				title="Optional"
				tasks={data}
				isEssential={false}
				onToggle={toggleTaskStatus}
			/>
		</>
	);
}
