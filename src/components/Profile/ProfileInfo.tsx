import React, { FormEvent } from "react";
import { Profile } from "@/types";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";

interface Props {
  data: Profile;
}

const ProfileInfo: React.FC<Props> = ({ data }) => {
  const { formData, handleInputChange } = useForm({
    firstName: { value: data.first_name },
    lastName: { value: data.last_name },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field label="Email" name="email" value={data.email} readonly copy />
        <Field
          label="First name"
          name="firstName"
          value={formData.firstName.value}
          required={formData.firstName.required}
          onInput={handleInputChange}
        />
        <Field
          label="Last name"
          name="lastName"
          value={formData.lastName.value}
          required={formData.lastName.required}
          onInput={handleInputChange}
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  );
};

export default ProfileInfo;
