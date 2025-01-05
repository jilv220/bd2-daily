import { Link } from "react-router";
import { useSession } from "~/components/session-provider";
import { buttonVariants } from "~/components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { useTheme } from "../components/theme-provider";
import { DropDown } from "./dropdown";

export function SiteHeader() {
	const themeState = useTheme();
	const theme = themeState.theme;
	const logoUrl =
		theme === "dark"
			? "/browndust2-logo-white.png"
			: "/browndust2-logo-black.png";

	const session = useSession();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95">
			<div className="flex items-center space-x-2 h-14 px-5">
				<div className="flex-grow">
					<nav className="flex justify-center items-center space-x-6 text-base font-medium text-foreground/60 md:justify-start">
						<Link to="/">
							<img
								className="h-10"
								loading="lazy"
								src={logoUrl}
								alt="browndust2-logo"
							/>
						</Link>
					</nav>
				</div>
				<div className="flex items-center space-x-4">
					<ModeToggle />
					{session ? (
						<DropDown />
					) : (
						<Link
							className={buttonVariants({ variant: "default" })}
							to="/signin"
						>
							Log In
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
