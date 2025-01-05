import { supabase } from "~/clients";

export async function fetchDailyTasks() {
	const { data, error } = await supabase
		.from("user_tasks")
		.select(`
			user_id,
			assigned_date,
			is_finished,
			tasks (
				id,
				title,
				is_essential
			)
		`)
		.eq("assigned_date", new Date().toISOString().split("T")[0])
		.order("task_id", { ascending: true });

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
