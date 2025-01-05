import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "~/clients";

type SessionProviderProps = {
	children: React.ReactNode;
};

const SessionContext = createContext<Session | null>(null);
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }: SessionProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
		};
		fetchSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
};
