import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			refetchOnWindowFocus: true,
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});
