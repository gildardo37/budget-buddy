import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { useAddProfile, useSignUp } from "@/services/useApi";
import { handleErrors } from "@/utils/errors";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/Button/ButtonLink";
import { Header } from "@/components/Header";
import { CheckIcon } from "@/components/svgs/CheckIcon";

const SignUp: NextPage = () => {
  const { displayAlert } = useAlert();
  const [isSigned, setIsSigned] = useState(false);
  const { formData, handleInputChange, isDisabled } = useForm({
    email: { value: "" },
    password: { value: "" },
    firstName: { value: "" },
    lastName: { value: "" },
    confirmPassword: { value: "" },
  });
  const { mutateAsync: signUp, isLoading: signUpLoading } = useSignUp();
  const { mutateAsync: addProfile, isLoading: profileLoading } =
    useAddProfile();

  const isLoading = signUpLoading || profileLoading;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { email, password, confirmPassword, firstName, lastName } =
        formData;

      if (password.value !== confirmPassword.value) {
        throw new Error("Passwords must match!");
      }

      const { data, error } = await signUp({
        email: email.value,
        password: password.value,
      });

      if (error || !data) {
        throw error;
      } else if (data?.user) {
        const { id } = data.user;
        const { error: profileError } = await addProfile({
          id,
          email: email.value,
          first_name: firstName.value,
          last_name: lastName.value,
        });
        if (profileError) throw profileError;
        setIsSigned(true);
      } else {
        throw new Error("Something failed");
      }
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-32px)] w-full max-w-md flex-1 flex-col justify-center gap-4">
      {isSigned ? (
        <>
          <div className="flex justify-center">
            <CheckIcon />
          </div>
          <p className="text-center">
            Thank you for signing up with our service! We are excited to have
            you on board.
          </p>
          <p className="text-center">
            To complete your registration, we have sent a confirmation link to
            the email address you provided during sign-up. Please check your
            inbox (and your spam folder, just in case) and click on the
            confirmation link to verify your account.
          </p>
          <p className="mb-4 text-center">
            If you did not receive the email, please contact our support team
            and we will be happy to assist you. Thank you for choosing our
            service.
          </p>
          <ButtonLink href="/">Go back to login</ButtonLink>
        </>
      ) : (
        <>
          <Header title="Sign Up" alignText="center" />
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Field
              type="text"
              name="firstName"
              label="First Name"
              onInput={handleInputChange}
              value={formData.firstName.value}
              disabled={isLoading}
              required={formData.firstName.required}
            />
            <Field
              type="text"
              name="lastName"
              label="Last Name"
              onInput={handleInputChange}
              value={formData.lastName.value}
              disabled={isLoading}
              required={formData.lastName.required}
            />
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
            <Field
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onInput={handleInputChange}
              value={formData.confirmPassword.value}
              disabled={isLoading}
              required={formData.confirmPassword.required}
            />
            <Button
              type="submit"
              disabled={isLoading || isDisabled}
              isLoading={isLoading}
            >
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
