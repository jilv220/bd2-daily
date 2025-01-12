import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import SortableItem from "~/home/sortable-item";
import { debounce } from "~/lib/utils";
import type { DailyTasks, TaskPostion } from "./fetch";

interface DraggableTaskListProps {
	tasks: DailyTasks;
	onSave: (newOrder: TaskPostion[]) => void;
}

export function DraggableTaskList({
	tasks: initialTasks,
	onSave,
}: DraggableTaskListProps) {
	const [tasks, setTasks] = useState(
		initialTasks.map((task, index) => ({
			...task,
			position: task.position ?? index,
		})),
	);

	// Create a debounced save function
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const debouncedSave = useCallback(
		debounce((tasksToSave: typeof tasks) => {
			const newOrder = tasksToSave.map((task, index) => ({
				userId: task.user_id,
				taskId: task.task_id,
				position: index,
			}));
			onSave(newOrder);
		}, 1000),
		[onSave],
	);

	// Clean up debounced function on unmount
	useEffect(() => {
		return () => {
			debouncedSave.cancel();
		};
	}, [debouncedSave]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				// Only start dragging after moving
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			// Require press and hold for touch devices
			activationConstraint: {
				delay: 400,
				distance: 10,
				tolerance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over || active.id === over.id) {
			return;
		}

		setTasks((items) => {
			const oldIndex = items.findIndex((item) => item.task_id === active.id);
			const newIndex = items.findIndex((item) => item.task_id === over.id);
			const newItems = arrayMove(items, oldIndex, newIndex);

			// Trigger debounced save
			debouncedSave(newItems);

			return newItems;
		});
	}

	return (
		<div className="space-y-4 px-2">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={tasks.map((t) => t.task_id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="space-y-2">
						{tasks.map((task) => (
							<SortableItem
								key={task.task_id}
								id={task.task_id}
								title={task.title}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}

export default DraggableTaskList;
