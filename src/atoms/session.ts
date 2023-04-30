import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

export const sessionLoadingAtom = atom(true);
export const sessionAtom = atom<Session | undefined>(undefined);
