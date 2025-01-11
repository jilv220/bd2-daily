import { Link, useLocation } from "react-router";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "~/components/ui/sidebar";
import { useIsMobile } from "~/hooks/use-mobile";
import { RefinementConverter } from "./refinement-converter";

const data = {
	home: {
		title: "Daily Tracker",
		url: "/",
	},
	navMain: [
		{
			title: "Costumes",
			items: [
				{
					title: "Knockback",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<RefinementConverter />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				<SidebarMenu>
					<SidebarMenuItem className="px-2">
						<SidebarMenuButton asChild isActive={data.home.url === pathname}>
							<Link to={data.home.url}>{data.home.title}</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				{/* We create a collapsible SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={item.url === pathname}>
											<Link to={item.url}>{item.title}</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
