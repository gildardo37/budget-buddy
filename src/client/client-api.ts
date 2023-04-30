import { Profile, UpdateProfile, AddProfile } from "@/types";
import { supabase } from "./database";
import { Session } from "@supabase/gotrue-js/src/lib/types";

export const wait = (ms: number) => new Promise((fn) => setTimeout(fn, ms));

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const setUserSession = async (data: Session) => {
  const { access_token, refresh_token } = data;
  await wait(2000);
  return await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
};

export const validateSession = async () => {
  await wait(2000);
  return await supabase.auth.getSession();
};

export const getUsers = async () => {
  const res = await supabase.from("users").select("*");
  await wait(2000);
  return res.data as Profile[];
};

export const getUserById = async (id: string) => {
  const res = await supabase.from("users").select().eq("id", id);
  await wait(2000);
  if (res.data) {
    return res.data[0] as Profile;
  }
  return undefined;
};

export const addUser = async (user: AddProfile) => {
  const res = await supabase.from("users").insert([user]);
  await wait(2000);
  return res.data;
};

export const updateUser = async ({ id, user }: UpdateProfile) => {
  const res = await supabase.from("users").update(user).eq("id", id);
  await wait(2000);
  return res.data;
};
