import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import useProfile from "~/hooks/useProfile";
import { signOut } from "~/lib/auth";

export function DropDown() {
	const { data: profile, isPending, isError, error } = useProfile();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="rounded-full" variant="outline" size="icon">
					<Avatar className="h-10 w-10">
						<AvatarImage
							className="rounded-full"
							src={profile?.avatar_url || undefined}
							alt="user image"
							width={32}
							height={32}
						/>
						<AvatarFallback>AI</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={async () => {
						await signOut();
					}}
				>
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
