import { Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { supabase } from "~/clients";
import Divider from "~/components/divider";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import AuthHeader from "./auth-header";

export default function Login() {
	return (
		<Card className="md:w-[40%]">
			<CardHeader className="space-y-0 pb-4">
				<CardTitle className="text-3xl">Log In</CardTitle>
				<div className="text-muted-foreground">continue with:</div>
			</CardHeader>
			<CardFooter className="w-full flex-col p-10 pt-0">
				<div className="flex flex-col gap-2 w-full">
					<Button
						onClick={async () => {
							const { data, error } = await supabase.auth.signInWithOAuth({
								provider: "github",
							});
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
