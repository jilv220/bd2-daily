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
			{tasks.map((d) => (
				<div
					className="flex items-center justify-between space-x-2"
					key={d.tasks.id}
				>
					<Label>{d.tasks.title}</Label>
					<Checkbox
						checked={d.is_finished}
						onClick={() =>
							onToggle({
								taskId: d.tasks.id,
								currentStatus: d.is_finished,
							})
						}
					/>
				</div>
			))}
		</div>
	);
}
