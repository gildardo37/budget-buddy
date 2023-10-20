import { FormEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAtom } from "jotai";
import { sessionAtom } from "@/atoms/session";
import { useLogin, useSetUserSession } from "@/services/useApi";
import { handleErrors } from "@/utils/errors";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/Button/ButtonLink";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [, setSession] = useAtom(sessionAtom);
  const { displayAlert } = useAlert();
  const { mutateAsync: signIn, isLoading: isLoginLoading } = useLogin();
  const { mutateAsync: setUserSession, isLoading: isSessionLoading } =
    useSetUserSession();
  const { formData, handleInputChange, isDisabled } = useForm({
    email: { value: "" },
    password: { value: "" },
  });

  const isLoading = isLoginLoading || isSessionLoading;

  async function logIn(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const { email, password } = formData;
      const { data, error } = await signIn({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      if (data.session) {
        const { error: sessionError } = await setUserSession(data.session);
        if (sessionError) throw sessionError;
        setSession(data.session);
        router.replace("/budget");
      } else {
        throw new Error("Something failed");
      }
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  }

  return (
    <section className="flex flex-col gap-4 justify-center flex-1 min-h-[calc(100dvh-32px)] w-full max-w-md mx-auto">
      <div className="flex justify-center">
        <Image
          src="/img/logo.svg"
          width="300"
          height="100"
          alt="Budget Buddy logo"
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={logIn}>
        <Field
          type="email"
          name="email"
          label="Email"
          onInput={handleInputChange}
          value={formData.email.value}
          disabled={isLoading}
          required={formData.email.required}
        />
        <Field
          type="password"
          name="password"
          label="Password"
          onInput={handleInputChange}
          value={formData.password.value}
          disabled={isLoading}
          required={formData.password.required}
        />
        <Button
          type="submit"
          disabled={isLoading || isDisabled}
          isLoading={isLoading}
        >
          sign in
        </Button>
        <div className="flex justify-center items-center gap-4 px-2">
          <span className="h-[1px] bg-gray-300 flex-grow w-full" />
          <span className="flex-shrink-0 text-center text-gray-500">Or</span>
          <span className="h-[1px] bg-gray-300 flex-grow w-full" />
        </div>
        <ButtonLink href="/sign-up">Sign up</ButtonLink>
      </form>
      <div className="flex flex-col items-center py-4"></div>
    </section>
  );
};

export default LoginPage;
