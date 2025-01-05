import { Outlet, useLoaderData } from "react-router";
import { SiteFooter } from "~/home/footer";
import { SiteHeader } from "~/home/header";

export default function HomeLayout() {
	return (
		<div className="relative flex min-h-screen flex-col">
			<SiteHeader />
			<main className="container mx-auto py-6">
				<Outlet />
			</main>
			<SiteFooter />
		</div>
	);
}
