import { supabase } from "~/clients";

/**
 * App-wide fetches
 */

export const fetchSession = async () => {
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error) throw new Error(error.message);
	return session;
};

export const fetchProfile = async (userId: string) => {
	const { data, error } = await supabase
		.from("profiles")
		.select("username, website, avatar_url")
		.eq("id", userId)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
