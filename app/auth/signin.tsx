import { Github } from "lucide-react";
import { redirect } from "react-router";
import { supabase } from "~/clients";
import { Google } from "~/components/custom-icons";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { AuthBtn } from "./auth-btn";

export async function clientLoader() {
	const { data, error } = await supabase.auth.getSession();
	if (data.session) {
		return redirect("/");
	}
	if (error) return error.message;
}

export default function Login() {
	return (
		<Card className="md:w-[40%]">
			<CardHeader className="space-y-0 pb-4">
				<CardTitle className="text-3xl">Log In</CardTitle>
				<div className="text-muted-foreground">continue with:</div>
			</CardHeader>
			<CardFooter className="w-full flex-col p-10 pt-0">
				<div className="flex w-full flex-col gap-2">
					<AuthBtn provider="github" ProviderIcon={Github} />
					<AuthBtn provider="google" ProviderIcon={Google} />
				</div>
			</CardFooter>
		</Card>
	);
}
