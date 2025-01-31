import { Link } from "react-router";
import { useSession } from "~/components/session-provider";
import { useTheme } from "~/components/theme-provider";
import { buttonVariants } from "~/components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { DropDown } from "./dropdown";

type AppHeaderProps = {
	children?: React.ReactNode;
};

export function AppHeader({ children }: AppHeaderProps) {
	const { theme, systemTheme } = useTheme();

	const whiteLogoUrl = "/browndust2-logo-white.png";
	const blackLogoUrl = "/browndust2-logo-black.png";
	const isDark =
		theme === "dark" || (theme === "system" && systemTheme === "dark");
	const logoUrl = isDark ? whiteLogoUrl : blackLogoUrl;

	const session = useSession();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95">
			<div className="flex h-14 items-center space-x-2 pr-5">
				<div className="flex-grow">
					<nav className="flex items-center space-x-2 font-medium text-base text-foreground/60 md:justify-start">
						{children}
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
