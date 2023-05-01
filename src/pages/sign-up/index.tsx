import { FormEvent, useState, ChangeEvent, useMemo } from "react";
import { NextPage } from "next";
import { useAddProfile, useSignUp } from "@/client/user-client";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { ErrorLabel } from "@/components/ErrorLabel";
import { ButtonLink } from "@/components/Button/ButtonLink";

const SignUp: NextPage = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const {
    mutateAsync: signUp,
    isLoading: signUpLoading,
    error: signUpError,
  } = useSignUp();
  const {
    mutateAsync: addProfile,
    isLoading: profileLoading,
    error: profileError,
  } = useAddProfile();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const {
        email,
        password,
        confirmPassword,
        firstName: first_name,
        lastName: last_name,
      } = formData;

      if (password !== confirmPassword) {
        return setError("Passwords must match!");
      }

      const { data, error } = await signUp({ email, password });

      if (error) {
        return setError(error.message);
      } else if (data.user) {
        const { id } = data.user;
        const response = await addProfile({ id, email, first_name, last_name });
        if (response.error) {
          return setError(response.error.message);
        }
        setError("");
        setIsSigned(true);
        return;
      }
      setError("Something failed");
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isLoading = useMemo(() => {
    return signUpLoading || profileLoading;
  }, [signUpLoading, profileLoading]);

  return (
    <section className="flex flex-col gap-4 justify-center flex-1 min-h-[calc(100dvh-32px)]">
      {isSigned ? (
        <>
          <p>
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
          <ButtonLink href="/">Go back to login</ButtonLink>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-semibold py-4">Sign Up</h2>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Field
              type="text"
              name="firstName"
              label="First Name"
              onInput={handleInputChange}
              required
              disabled={isLoading}
            />
            <Field
              type="text"
              name="lastName"
              label="Last Name"
              onInput={handleInputChange}
              required
              disabled={isLoading}
            />
            <Field
              type="email"
              name="email"
              label="Email"
              onInput={handleInputChange}
              required
              disabled={isLoading}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              onInput={handleInputChange}
              required
              disabled={isLoading}
            />
            <Field
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onInput={handleInputChange}
              required
              disabled={isLoading}
            />
            {error || signUpError || profileError ? (
              <ErrorLabel>{error || "Something failed"}</ErrorLabel>
            ) : null}
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
          <ButtonLink href="/">Go back to login</ButtonLink>
        </>
      )}
    </section>
  );
};

export default SignUp;
