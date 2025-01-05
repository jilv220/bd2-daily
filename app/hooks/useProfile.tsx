import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/clients";
import { useSession } from "~/components/session-provider";

const fetchProfile = async (userId: string) => {
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

const useProfile = () => {
	const session = useSession();

	return useQuery({
		queryKey: ["profile", session?.user?.id],
		queryFn: ({ queryKey }) => fetchProfile(queryKey[1] as string),
		enabled: !!session?.user?.id,
	});
};

export default useProfile;
