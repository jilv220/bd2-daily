import { countBy, groupBy, prop } from "remeda";
import { supabase } from "~/clients";

export async function fetchDailyTasks() {
	const { data, error } = await supabase
		.from("user_tasks_with_position")
		.select("*")
		.eq("assigned_date", new Date().toISOString().split("T")[0])
		.order("position", { ascending: true, nullsFirst: false });

	if (error) {
		throw new Error(error.message);
	}
	return data;
}
export type DailyTasks = Awaited<ReturnType<typeof fetchDailyTasks>>;

export async function fetchTaskCounts() {
	const { data, error } = await supabase.from("tasks").select("is_essential");
	if (error) {
		throw new Error(error.message);
	}

	const countByCatagory = countBy(data, (v) =>
		v.is_essential ? "essential" : "optional",
	);

	return {
		...countByCatagory,
	};
}

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
