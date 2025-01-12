import { Settings } from "lucide-react";
import { useState } from "react";
import { capitalize } from "remeda";
import { Button } from "~/components/ui/button";
import type { Database } from "~/database.types";
import { useDailyTasks } from "~/hooks/use-daily-tasks";
import DraggableTaskList from "./draggable-task-list";
import type { TaskPostion } from "./fetch";
import { TaskList } from "./task-list";

interface TaskListContainerProps {
	category: Database["public"]["Enums"]["task_category"];
}

export function TaskListContainer({ category }: TaskListContainerProps) {
	const [isEditing, setIsEditing] = useState(false);
	const {
		data: tasks,
		toggleTaskStatus,
		updateTaskPositions,
		isUpdatingPositions,
	} = useDailyTasks();

	const filteredTasks = tasks.filter((t) => t.category === category);
	if (!filteredTasks || filteredTasks.length === 0) return null;

	const handleSaveOrder = (newOrder: TaskPostion[]) => {
		updateTaskPositions({
			newOrder,
			category,
		});
	};

	return (
		<>
			<div className="mb-2 flex flex-row items-center justify-between border-b pb-1">
				<h2>{capitalize(category)}</h2>
				<div className="flex flex-row items-center">
					<h3 className="font-medium text-primary/60 text-sm">
						{isUpdatingPositions ? "Saving changes..." : null}
					</h3>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsEditing(!isEditing)}
						disabled={isUpdatingPositions}
					>
						<Settings />
					</Button>
				</div>
			</div>
			{isEditing ? (
				<DraggableTaskList tasks={filteredTasks} onSave={handleSaveOrder} />
			) : (
				<TaskList tasks={filteredTasks} onToggle={toggleTaskStatus} />
			)}
		</>
	);
}
