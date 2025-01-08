import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
	id: string;
	title: string;
}

export function SortableItem({ id, title }: SortableItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`flex items-center space-x-2 rounded-md border p-2 ${
				isDragging ? "bg-muted" : "bg-background"
			}`}
		>
			<button
				{...attributes}
				{...listeners}
				className="cursor-grab hover:text-primary"
			>
				<GripVertical className="h-4 w-4" />
			</button>
			<span className="flex-1">{title}</span>
		</div>
	);
}

export default SortableItem;
