import { ChangeEvent, useMemo, useState } from "react";
import { cleanPriceString } from "@/utils/numbers";

interface FormData {
  [key: string]: FormDataItems;
}
interface FormDataItems {
  required?: boolean;
  value: string;
  isNumber?: boolean;
}
interface FormItems {
  required: boolean;
  value: string;
  isNumber: boolean;
}

export const useForm = <T extends FormData>(data: T) => {
  const transformValues = (form?: typeof data) => {
    const newFormData: { [K in keyof T]: FormItems } = {} as any;
    const items = form ?? data;

    for (const key in items) {
      if (Object.prototype.hasOwnProperty.call(items, key)) {
        const { required, isNumber, value } = items[key];
        newFormData[key] = {
          required: required ?? true,
          isNumber: isNumber ?? false,
          value,
        };
      }
    }
    return newFormData;
  };
  const [formData, setFormData] = useState(transformValues());
  const excludedNumberNames = ["ammount"];

  const setForm = (form: typeof data) => {
    setFormData(transformValues(form));
  };

  const valueIsNumber = (name: string) => {
    return formData[name].isNumber || excludedNumberNames.includes(name);
  };

  const isDisabled = useMemo<boolean>(() => {
    return !Object.values(formData).every((i) => i.value);
  }, [formData]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newValue = valueIsNumber(name) ? cleanPriceString(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: {
        required: formData[name].required,
        value: newValue,
      },
    }));
  };

  const resetForm = () => {
    setFormData(transformValues());
  };

  return { formData, setForm, isDisabled, handleInputChange, resetForm };
};
