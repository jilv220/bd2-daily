import { Github } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../components/ui/button";

export function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t py-2 pr-2 md:px-4 md:py-0">
			<div className="flex justify-end items-center space-x-2 text-balance py-2 text-center text-muted-foreground text-sm leading-loose md:space-x-0 md:text-left">
				<p>
					© {year} bd2-daily by jilv220. All rights reserved. This website is
					not affiliated with or endorsed by Browndust2. All trademarks and
					copyrights of the game and its characters are owned by their
					respective owners.
				</p>
				<Link
					className={cn(
						buttonVariants({
							variant: "ghost",
							size: "icon",
						}),
					)}
					to="https://github.com/jilv220"
					target="_blank"
				>
					<Github />
				</Link>
			</div>
		</footer>
	);
}
