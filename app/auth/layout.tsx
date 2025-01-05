import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="mt-12 flex flex-col items-center justify-center">
			<Outlet />
		</div>
	);
}
