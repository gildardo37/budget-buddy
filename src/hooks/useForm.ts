import { cleanPriceString } from "@/utils/numbers";
import { ChangeEvent, useMemo, useState } from "react";

interface FormData {
  [key: string]: FormDataItems;
}
interface FormDataItems {
  required?: boolean;
  value: string;
}

export const useForm = <T extends FormData>(
  data: T,
  numberValues?: string[]
) => {
  const transformValues = () => {
    const newFormData = { ...data };
    for (const key in data) {
      if (data[key].required === undefined || data[key].required === null)
        data[key].required = true;
    }
    return newFormData as {
      [K in keyof T]: FormDataItems
    };
  };
  const excludeString = numberValues || ["ammount"];
  const [formData, setFormData] = useState(transformValues());

  const isDisabled = useMemo<boolean>(() => {
    return !Object.values(formData).every((i) => i);
  }, [formData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = excludeString.includes(value)
      ? cleanPriceString(value)
      : value;
    setFormData((prev) => ({
      ...prev,
      [name]: {
        required: formData[name].required,
        value: newValue,
      },
    }));
  };

  const resetForm = () => {
    setFormData(data);
  };

  return { formData, setFormData, isDisabled, handleInputChange, resetForm };
};
