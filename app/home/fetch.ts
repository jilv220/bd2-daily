import { countBy } from "remeda";
import { supabase } from "~/clients";
import type { Database, TaskCategory } from "~/database.types";

export async function fetchTaskCounts() {
	const { data, error } = await supabase.from("tasks").select("category");
	if (error) {
		throw new Error(error.message);
	}

	const countByCatagory = countBy(data, (v) => v.category);
	return {
		...countByCatagory,
	};
}
export type TaskCounts = Awaited<ReturnType<typeof fetchTaskCounts>>;

export async function fetchDailyTasks() {
	const { data, error } = await supabase
		.from("user_tasks_with_position")
		.select("*")
		.eq("assigned_date", new Date().toISOString().split("T")[0])
		.order("category")
		.order("position", { ascending: true, nullsFirst: false });

	if (error) {
		throw new Error(error.message);
	}
	return data;
}
export type DailyTasks = Awaited<ReturnType<typeof fetchDailyTasks>>;

export async function toggleDailyTaskStatus(
	taskId: string,
	isFinished: boolean,
) {
	const { error } = await supabase
		.from("user_tasks")
		.update({
			is_finished: !isFinished,
		})
		.eq("task_id", taskId);

	if (error) {
		throw new Error(error.message);
	}
}

export type TaskPostion = {
	userId: string;
	taskId: string;
	position: number;
};
export async function updateTaskPositions(
	newOrder: TaskPostion[],
	category: TaskCategory,
) {
	const { error } = await supabase.from("task_orders").upsert(
		newOrder.map(({ userId, taskId, position }) => ({
			user_id: userId,
			task_id: taskId,
			position,
			category,
		})),
		{
			onConflict: "user_id,task_id",
			ignoreDuplicates: false,
		},
	);

	if (error) throw new Error(error.message);
}
