import React, { FormEvent, useEffect } from "react";
import { NextPage } from "next";
import { Header } from "@/components/Header";
import { useGetProfile } from "@/client/user-client";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { useForm } from "@/hooks/useForm";
import { Profile } from "@/types";
// import { useAlert } from "@/hooks/useAlert";

const Profile: NextPage = () => {
  const { data } = useGetProfile();
  const { formData, setForm, handleInputChange } = useForm({
    firstName: {
      value: "23",
    },
    lastName: {
      value: "",
    },
  });
  // const { displayAlert } = useAlert();
  useEffect(() => {
    if (data?.data?.length) {
      const user = data.data[0] as Profile;
      setForm({
        firstName: {
          value: user.first_name,
        },
        lastName: {
          value: user.last_name,
        },
      });
    }
    //eslint-disable-next-line
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col">
      <Header title="My Profile" showBack />
      <pre>{data?.data ? JSON.stringify(data, null, 2) : null}</pre>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field
          label="First name"
          type="text"
          name="firstName"
          value={formData.firstName.value}
          required={formData.firstName.required}
          onInput={handleInputChange}
        />
        <Field
          label="Last name"
          type="text"
          name="lastName"
          value={formData.lastName.value}
          required={formData.lastName.required}
          onInput={handleInputChange}
        />
        <Button type="submit">Update</Button>
      </form>
    </section>
  );
};

export default Profile;
