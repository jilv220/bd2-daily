import type { MergeDeep } from "type-fest";
import type { Database as DatabaseGenerated } from "./database-generated.types";
export type { Json } from "./database-generated.types";

/**
 *  Workaround for postgres limitation on view.
 *  See https://github.com/orgs/supabase/discussions/14151
 */
export type Database = MergeDeep<
	DatabaseGenerated,
	{
		public: {
			Views: {
				user_tasks_with_position: {
					Row: {
						assigned_date: string;
						is_essential: boolean;
						is_finished: boolean;
						position: number | null;
						task_id: string;
						title: string;
						user_id: string;
					};
				};
			};
		};
	}
>;
