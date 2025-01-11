import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Gavel, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	useFormField,
} from "./ui/form";
import { Input } from "./ui/input";

const REFINEMENT_SCORES = {
	s: 4,
	a: 3,
	b: 2,
	c: 1,
} as const;
type RefinementChar = keyof typeof REFINEMENT_SCORES;

const refinementSchema = z.object({
	refinement: z
		.string()
		.transform((str) => str.toLowerCase())
		.pipe(
			z
				.string()
				.regex(
					new RegExp(`^[${Object.keys(REFINEMENT_SCORES).join("")}]*$`),
					"Has invalid character",
				)
				.length(3, "Must be 3 characters"),
		),
});

const calculateRefinementScore = (refinement: string): number => {
	return refinement.split("").reduce((sum, char, index) => {
		const score = REFINEMENT_SCORES[char as RefinementChar] ?? 0;
		return sum + score * (index + 1);
	}, 0);
};

export function RefinementConverter() {
	const form = useForm<z.infer<typeof refinementSchema>>({
		resolver: zodResolver(refinementSchema),
		defaultValues: {
			refinement: "",
		},
	});
	const {
		formState: { isValid, isDirty },
	} = form;

	const [convertRes, setConvertRes] = useState(-1);
	useEffect(() => {
		if (!isValid) {
			setConvertRes(-1);
		}
	}, [isValid]);

	const onSumbit = ({ refinement }: z.infer<typeof refinementSchema>) => {
		setConvertRes(calculateRefinementScore(refinement));
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu
					onOpenChange={(isOpen) => {
						if (!isOpen) {
							form.reset();
							setConvertRes(-1);
						}
					}}
				>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size={"lg"}
							className="text-base data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Gavel />
							Convert Refinement
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={"bottom"}
						sideOffset={4}
					>
						<Form {...form}>
							<form
								className="flex w-full items-start space-x-1 px-[2px]"
								autoComplete="off"
								onSubmit={form.handleSubmit(onSumbit)}
							>
								<FormField
									control={form.control}
									name="refinement"
									render={({ field }) => (
										<div className="flex flex-col">
											<FormItem className="flex-1">
												<FormControl>
													<Input
														className="my-1 focus-visible:ring-0 focus-visible:ring-offset-0"
														type="text"
														placeholder="ccc"
														{...field}
													/>
												</FormControl>
											</FormItem>
											<FormMessage className="pt-0 pb-1 pl-1" />
											{convertRes !== -1 ? (
												<p className="pt-0 pb-1 pl-1 font-medium text-sm">
													Result is{" "}
													<span className="text-emerald-500">
														{convertRes}C
													</span>
												</p>
											) : null}
										</div>
									)}
								/>
								<Button
									className="my-1 h-10 w-10"
									variant={"ghost"}
									type="submit"
									disabled={!isDirty || !isValid}
								>
									<Search />
								</Button>
							</form>
						</Form>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
