import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Gavel, Search } from "lucide-react";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const REFINEMENT_SCORES = {
	s: 4,
	a: 3,
	b: 2,
	c: 1,
} as const;
type RefinementChar = keyof typeof REFINEMENT_SCORES;

const errorMessage = "Invalid Input";
const refinementSchema = z.object({
	refinement: z
		.string()
		.trim()
		.toLowerCase()
		.pipe(
			z
				.string()
				.length(3, errorMessage)
				.regex(
					new RegExp(`^[${Object.keys(REFINEMENT_SCORES).join("")}]*$`),
					errorMessage,
				),
		),
});
type RefinementFormValues = z.infer<typeof refinementSchema>;

const calculateRefinementScore = (refinement: string): number => {
	if (refinement === "") return -1;

	return refinement.split("").reduce((sum, char, index) => {
		const score = REFINEMENT_SCORES[char as RefinementChar] ?? 0;
		return sum + score * (index + 1);
	}, 0);
};

export function RefinementConverter() {
	const form = useForm<RefinementFormValues>({
		resolver: zodResolver(refinementSchema),
		defaultValues: {
			refinement: "",
		},
	});
	const {
		formState: { errors, isSubmitSuccessful },
		reset,
	} = form;

	const onSubmit = ({ refinement }: RefinementFormValues) => {
		return calculateRefinementScore(refinement);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	) => {
		reset({ refinement: e.target.value }, { keepValues: true });
		onChange(e);
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu
					onOpenChange={(isOpen) => {
						if (!isOpen) {
							reset();
						}
					}}
				>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
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
						side="bottom"
						sideOffset={4}
					>
						<Form {...form}>
							<form
								className="flex w-full items-start space-x-1 px-[2px]"
								onSubmit={form.handleSubmit(onSubmit)}
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
														onChange={(e) =>
															handleInputChange(e, field.onChange)
														}
													/>
												</FormControl>
												{errors.refinement ? (
													<FormMessage />
												) : (
													isSubmitSuccessful && (
														<p className="font-medium text-sm">
															Result is{" "}
															<span className="text-emerald-500">
																{calculateRefinementScore(field.value)}C
															</span>
														</p>
													)
												)}
											</FormItem>
										</div>
									)}
								/>
								<Button className="my-1 h-9 w-9" variant="ghost" type="submit">
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
