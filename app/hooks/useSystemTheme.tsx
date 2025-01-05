import { useEffect, useState } from "react";
import { useTheme } from "~/components/theme-provider";

export const useSystemTheme = () => {
	const themeState = useTheme();
	const theme = themeState.theme;
	const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

	useEffect(() => {
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			setSystemTheme(systemTheme);
			return;
		}
	}, [theme]);

	return [theme, systemTheme];
};
