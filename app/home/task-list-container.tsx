import type { Database } from "~/database.types";
import { useDailyTasks } from "~/hooks/useDailyTasks";
import { TaskList } from "./task-list";

interface TaskListContainerProps {
	userId: string;
	category: Database["public"]["Enums"]["task_category"];
}

export function TaskListContainer({
	userId,
	category,
}: TaskListContainerProps) {
	const { data: tasks, toggleTaskStatus } = useDailyTasks(userId);

	const filteredTasks = tasks.filter((t) => t.category === category);
	if (!filteredTasks || filteredTasks.length === 0) return null;

	return <TaskList tasks={filteredTasks} onToggle={toggleTaskStatus} />;
}
