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
		touchAction: "none",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`flex items-center space-x-2 rounded-md border p-2 ${
				isDragging ? "bg-muted shadow-lg" : "bg-background"
			}`}
		>
			<button
				{...attributes}
				{...listeners}
				className="cursor-grab touch-none active:cursor-grabbing"
			>
				<GripVertical className="h-4 w-4 text-muted-foreground hover:text-primary" />
			</button>
			<span className="flex-1 select-none">{title}</span>
		</div>
	);
}

export default SortableItem;
