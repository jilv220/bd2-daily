import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";
import { SiteFooter } from "~/home/footer";
import { AppHeader } from "~/home/header";

export default function HomeLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="relative flex min-h-screen flex-col">
					<AppHeader>
						<SidebarTrigger className="ml-1 h-10 w-10 text-primary" />
					</AppHeader>
					<main className="container mx-auto px-6 py-6 sm:px-4 md:px-4">
						<Outlet />
					</main>
					<SiteFooter />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
