import { Field } from "@/components/Field";
import { setUserSession, signIn } from "@/client/client-api";
import { Button } from "@/components/Button";
import { NextPage } from "next";
import { ChangeEvent } from "react";
import { FormEvent, useState } from "react";
import { useAtom } from "jotai";
import { sessionAtom } from "@/atoms/session";
import { useRouter } from "next/router";
import Link from "next/link";
import { ErrorLabel } from "@/components/ErrorLabel";

const Overview: NextPage = () => {
  const router = useRouter();
  const [, setSession] = useAtom(sessionAtom);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function logIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const { email, password } = formData;
      const { data, error } = await signIn(email, password);

      if (error) {
        setErrorMessage(error.message);
      } else if (data.session) {
        const response = await setUserSession(data.session);
        if (!response.error) {
          setSession(data.session);
          setErrorMessage("");
          router.replace("/overview");
        }
      } else {
        console.log("Something error ocurred...");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
        {errorMessage ? <ErrorLabel>{errorMessage}</ErrorLabel> : null}
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
        <span className="text-center">Don&apos;t have an account?</span>
        <Link
          href="/sign-up"
          className="w-full py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] border border-blue-700 uppercase"
        >
          Sign up
        </Link>
      </form>
      <div className="flex flex-col items-center py-4"></div>
    </section>
  );
};

export default Overview;
