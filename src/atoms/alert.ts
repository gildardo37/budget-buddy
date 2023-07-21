import { AlertOptions } from "@/types";
import { atom } from "jotai";

export const alertAtom = atom(false);
export const alertOptionsAtom = atom<AlertOptions>({
  message: "",
  type: "success",
});
