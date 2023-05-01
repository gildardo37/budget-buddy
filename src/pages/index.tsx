import { FormEvent, useState, ChangeEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { sessionAtom } from "@/atoms/session";
import { useLogin, useSetUserSession } from "@/client/user-client";
import { ErrorLabel } from "@/components/ErrorLabel";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/Button/ButtonLink";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [, setSession] = useAtom(sessionAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    mutateAsync: signIn,
    isLoading: isLoginLoading,
    error: loginError,
  } = useLogin();
  const {
    mutateAsync: setUserSession,
    isLoading: isSessionLoading,
    error: sessionError,
  } = useSetUserSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function logIn(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const { email, password } = formData;
      const { data, error } = await signIn({ email, password });

      if (error) {
        setErrorMessage(error.message);
      } else if (data.session) {
        const response = await setUserSession(data.session);
        if (!response.error) {
          setSession(data.session);
          setErrorMessage("");
          router.replace("/budget");
        }
      } else {
        setErrorMessage("Something failed");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="flex flex-col gap-4 justify-center flex-1 min-h-[calc(100dvh-32px)]">
      <h2 className="text-3xl font-semibold py-4">Log in</h2>
      <form className="flex flex-col gap-4" onSubmit={logIn}>
        <Field
          type="email"
          name="email"
          label="Email"
          onInput={handleInputChange}
          required
        />
        <Field
          type="password"
          name="password"
          label="Password"
          onInput={handleInputChange}
          required
        />
        {errorMessage || loginError || sessionError ? (
          <ErrorLabel>{errorMessage || "Something failed"}</ErrorLabel>
        ) : null}
        <Button type="submit" disabled={isLoginLoading || isSessionLoading}>
          Submit
        </Button>
        <span className="text-center">Don&apos;t have an account?</span>
        <ButtonLink href="/sign-up">Sign up</ButtonLink>
      </form>
      <div className="flex flex-col items-center py-4"></div>
    </section>
  );
};

export default LoginPage;
