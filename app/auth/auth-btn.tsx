import type { Provider } from "@supabase/supabase-js";
import { Icon, type LucideIcon } from "lucide-react";
import { capitalize } from "remeda";
import { supabase } from "~/clients";
import { Button } from "~/components/ui/button";

type AuthBtnProps = {
	provider: Provider;
	ProviderIcon: LucideIcon;
};

export function AuthBtn({ provider, ProviderIcon }: AuthBtnProps) {
	return (
		<Button
			variant={"outline"}
			onClick={async () => {
				const { error } = await supabase.auth.signInWithOAuth({ provider });
				if (error) {
					console.error("Error signing in the user", error);
				}
			}}
		>
			<ProviderIcon className="h-4 w-4" />
			Sign in with {capitalize(provider)}
		</Button>
	);
}
