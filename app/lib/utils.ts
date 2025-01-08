import { type ClassValue, clsx } from "clsx";
import { funnel } from "remeda";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounce<F extends (...args: any) => any>(
	func: F,
	wait = 0,
	{
		leading = false,
		trailing = true,
		maxWait,
	}: {
		readonly leading?: boolean;
		readonly trailing?: boolean;
		readonly maxWait?: number;
	} = {},
) {
	let cachedValue: ReturnType<F> | undefined;

	const { call, flush, cancel } = funnel(
		(args: Parameters<F>) => {
			if (leading || trailing) {
				cachedValue = func(...args) as ReturnType<F>;
			}
		},
		{
			reducer: (_, ...args: Parameters<F>) => args,
			burstCoolDownMs: wait,
			...(maxWait !== undefined && { maxBurstDurationMs: maxWait }),
			invokedAt: trailing ? (leading ? "both" : "end") : "start",
		},
	);
	return Object.assign(
		(...args: Parameters<F>) => {
			call(...args);
			return cachedValue;
		},
		{
			flush: () => {
				flush();
				return cachedValue;
			},

			cancel,
		},
	);
}
