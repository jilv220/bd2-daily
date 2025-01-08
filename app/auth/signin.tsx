import { Github } from "lucide-react";
import { redirect } from "react-router";
import { supabase } from "~/clients";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

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
					<Button
						onClick={async () => {
							const { error } = await supabase.auth.signInWithOAuth({
								provider: "github",
							});
							if (error) {
								console.error("Error signing in the user", error);
							}
						}}
					>
						<Github className="mr-2 h-4 w-4" />
						Sign in with Github
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
