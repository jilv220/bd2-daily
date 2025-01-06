import { Label } from "@radix-ui/react-label";
import { Checkbox } from "~/components/ui/checkbox";
import type { DailyTasks } from "./fetch";

interface TaskListProps {
	className?: string;
	title: string;
	tasks?: DailyTasks;
	isEssential: boolean;
	onToggle: (taskId: string, currentStatus: boolean) => void;
}

export function TaskList({
	className,
	title,
	tasks,
	isEssential,
	onToggle,
}: TaskListProps) {
	const filteredTasks = tasks?.filter(
		(d) => d.tasks.is_essential === isEssential,
	);

	if (!filteredTasks || filteredTasks.length === 0) return null;

	return (
		<div className={className}>
			<h2 className="pb-1">{title}</h2>
			{filteredTasks.map((d) => (
				<div
					className="flex items-center justify-between space-x-2 pb-2 md:pb-1"
					key={d.tasks.id}
				>
					<Label>{d.tasks.title}</Label>
					<Checkbox
						checked={d.is_finished}
						onClick={() => onToggle(d.tasks.id, d.is_finished)}
					/>
				</div>
			))}
		</div>
	);
}
