import { useQuery } from "@tanstack/react-query";
import { useSession } from "~/components/session-provider";
import { fetchProfile } from "~/lib/fetch";

const useProfile = () => {
	const session = useSession();

	return useQuery({
		queryKey: ["profile", session?.user?.id],
		queryFn: ({ queryKey }) => fetchProfile(queryKey[1] as string),
		enabled: !!session?.user?.id,
	});
};

export default useProfile;
