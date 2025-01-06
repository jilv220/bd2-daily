import { useDailyTasks } from "~/hooks/useDailyTasks";
import { TaskList } from "./task-list";

interface TaskListContainerProps {
	userId: string;
	isEssential: boolean;
}

export function TaskListContainer({
	userId,
	isEssential,
}: TaskListContainerProps) {
	const { data, toggleTaskStatus } = useDailyTasks(userId);

	const filteredTasks = data?.filter(
		(d) => d.tasks.is_essential === isEssential,
	);
	if (!filteredTasks || filteredTasks.length === 0) return null;

	return <TaskList tasks={filteredTasks} onToggle={toggleTaskStatus} />;
}
