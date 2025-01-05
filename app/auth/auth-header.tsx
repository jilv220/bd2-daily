import { Link, useLocation } from "react-router";
import { CardHeader, CardTitle } from "~/components/ui/card";

function LoginHeader() {
	return (
		<>
			<CardTitle className="text-3xl"> Log In</CardTitle>
			<div className="text-muted-foreground">
				New to BrownDust2 Daily?{" "}
				<Link
					to="/signup"
					className="font-medium text-blue-500 hover:underline hover:underline-offset-4"
				>
					Sign up for an account
				</Link>
			</div>
		</>
	);
}

function SignupHeader() {
	return (
		<>
			<CardTitle className="text-3xl"> Sign Up</CardTitle>
			<div className="text-muted-foreground">
				Already have an account?{" "}
				<Link
					to="/signin"
					className="font-medium text-blue-500 hover:underline hover:underline-offset-4"
				>
					Log In
				</Link>
			</div>
		</>
	);
}

export default function AuthHeader() {
	const location = useLocation();
	const pathname = location.pathname;
	return (
		<CardHeader className="space-y-0">
			{pathname === "/signin" ? <LoginHeader /> : <SignupHeader />}
		</CardHeader>
	);
}
