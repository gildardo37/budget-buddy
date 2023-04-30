import { FormEvent, useState, ChangeEvent } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { signUp } from "@/client/client-api";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { ErrorLabel } from "@/components/ErrorLabel";

const SignUp: NextPage = () => {
  const [hasSigned, setHasSigned] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function logIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const { email, password } = formData;
      const { data, error } = await signUp(email, password);
      console.log({ data, error });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setError("");
        setHasSigned(true);
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
      {hasSigned ? (
        <>
          <p className="">
            Thank you for signing up with our service! We are excited to have
            you on board.
          </p>
          <p>
            To complete your registration, we have sent a confirmation link to
            the email address you provided during sign-up. Please check your
            inbox (and your spam folder, just in case) and click on the
            confirmation link to verify your account.
          </p>
          <p className="mb-4">
            If you did not receive the email, please contact our support team
            and we will be happy to assist you. Thank you for choosing our
            service.
          </p>
          <Link
            href="/"
            className="w-full py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] border border-blue-700 uppercase"
          >
            Go back to login page
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-semibold py-4">Sign Up</h2>
          <form className="flex flex-col gap-4" onSubmit={logIn}>
            <Field
              type="text"
              name="firstName"
              label="First Name"
              onInput={handleInputChange}
              required
            />
            <Field
              type="text"
              name="lastName"
              label="Last Name"
              onInput={handleInputChange}
              required
            />
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
            {error ? <ErrorLabel>{error}</ErrorLabel> : null}
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
            <Link
              href="/"
              className="py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] border border-blue-700 uppercase"
            >
              Go back to login
            </Link>
          </form>
        </>
      )}
    </section>
  );
};

export default SignUp;
