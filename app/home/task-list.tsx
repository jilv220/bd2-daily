import { Label } from "@radix-ui/react-label";
import { Checkbox } from "~/components/ui/checkbox";
import type { DailyTasks } from "./fetch";

interface TaskListProps {
	tasks: DailyTasks;
	onToggle: (opt: { taskId: string; currentStatus: boolean }) => void;
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
	return (
		<div className="space-y-2">
			{tasks.map((t) => (
				<div className="flex items-center justify-between" key={t.task_id}>
					<Label>{t.title}</Label>
					<Checkbox
						className="mr-3"
						checked={t.is_finished}
						onClick={() =>
							onToggle({
								taskId: t.task_id,
								currentStatus: t.is_finished,
							})
						}
					/>
				</div>
			))}
		</div>
	);
}
