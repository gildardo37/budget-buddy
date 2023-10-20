import React, { FormEvent, useMemo } from "react";
import { Profile } from "@/types";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { useUpdateProfile } from "@/services/useClient";
import { useAlert } from "@/hooks/useAlert";
import { handleErrors } from "@/utils/errors";

interface Props {
  data: Profile;
}

export const ProfileInfo: React.FC<Props> = ({ data }) => {
  const { displayAlert } = useAlert();
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();
  const { formData, handleInputChange } = useForm({
    firstName: { value: data.first_name },
    lastName: { value: data.last_name },
  });
  const isFormModified = useMemo(() => {
    const { firstName, lastName } = formData;
    const { first_name, last_name } = data;
    return first_name !== firstName.value || last_name !== lastName.value;
  }, [formData, data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isFormModified) {
        return displayAlert({
          type: "warning",
          message: "The profile information is the same! Modify it to update.",
        });
      }
      const { firstName, lastName } = formData;
      const { error } = await updateProfile({
        first_name: firstName.value,
        last_name: lastName.value,
      });

      if (error) throw error;

      displayAlert({
        type: "success",
        message: "Profile information updated successfully!",
        duration: 4000,
      });
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
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
      <Button type="submit" disabled={!isFormModified || isLoading}>
        Update
      </Button>
    </form>
  );
};
