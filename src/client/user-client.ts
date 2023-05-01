import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./database";
import { AddBudget, AddProfile, Login } from "@/types";
import { Session } from "@supabase/supabase-js";

const budgetsKey = "budgets";

export const wait = (ms: number) => new Promise((fn) => setTimeout(fn, ms));

export const validateSession = async () => {
  await wait(2000);
  return await supabase.auth.getSession();
};

export const useLogin = () => {
  return useMutation(async ({ email, password }: Login) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  });
};

export const useSignUp = () => {
  return useMutation(async ({ email, password }: Login) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  });
};

export const useAddProfile = () => {
  return useMutation(
    async ({ id, email, first_name, last_name }: AddProfile) => {
      return await supabase.from("profile").insert({
        id,
        email,
        first_name,
        last_name,
      });
    }
  );
};

export const useSetUserSession = () => {
  return useMutation(async ({ access_token, refresh_token }: Session) => {
    await wait(2000);
    return await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
  });
};

export const useBudget = () => {
  return useQuery([budgetsKey], async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("budgets")
      .select()
      .eq("profile_id", data.session?.user.id);
  });
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ description, ammount }: AddBudget) => {
      const { data } = await supabase.auth.getSession();
      return await supabase
        .from("budgets")
        .insert({ description, ammount, profile_id: data.session?.user.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([budgetsKey]);
      },
    }
  );
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ description, ammount }: AddBudget) => {
      const { data } = await supabase.auth.getSession();
      return await supabase
        .from("budgets")
        .insert({ description, ammount, profile_id: data.session?.user.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([budgetsKey]);
      },
    }
  );
};
