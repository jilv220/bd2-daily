import { Skeleton } from "~/components/ui/skeleton";

type TaskListSkeletonProps = {
	length?: number;
};

export function TaskListSkeleton({ length = 3 }: TaskListSkeletonProps) {
	const arrFromLength = Array.from({ length }, (_v, i) => i);

	return (
		<div className="space-y-2">
			{arrFromLength.map((i) => (
				<div className="flex items-center justify-between space-x-2" key={i}>
					<Skeleton className="h-6 w-[260px]" />
					<Skeleton className="h-4 w-4 rounded" />
				</div>
			))}
		</div>
	);
}
