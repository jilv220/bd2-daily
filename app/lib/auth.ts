import { supabase } from "~/clients";

export async function signOut() {
	const { error } = await supabase.auth.signOut();
}
