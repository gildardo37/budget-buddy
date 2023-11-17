import React, { FormEvent, useMemo } from "react";
import {
  useAddTransaction,
  useGetCategories,
  useGetTransactionType,
  useUpdateTransaction,
} from "@/hooks/useApi";
import { AddTransactionProps, Transaction } from "@/types";
import { handleErrors } from "@/utils/errors";
import { capitalizeText } from "@/utils/strings";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Field/Dropdown";
interface Props {
  budgetId: string;
  onSuccess?: () => void;
  updateData?: Transaction;
}

export const TransactionForm: React.FC<Props> = ({
  budgetId,
  onSuccess = () => undefined,
  updateData,
}) => {
  const { displayAlert } = useAlert();
  const { data: transactionTypes, isLoading: isTypeLoading } =
    useGetTransactionType();

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories();

  const { mutateAsync: addTransaction, isLoading: isAddLoading } =
    useAddTransaction(budgetId);

  const { mutateAsync: updateTransaction, isLoading: isUpdateLoading } =
    useUpdateTransaction(budgetId, updateData?.id.toString() ?? "");

  const { formData, resetForm, isDisabled, handleInputChange } = useForm({
    description: { value: updateData?.description ?? "" },
    amount: { value: updateData?.amount.toString() ?? "" },
    type: {
      value:
        updateData?.transaction_type_fk.toString() ??
        transactionTypes?.data?.[0].id.toString() ??
        "2",
    },
    category: {
      value: updateData?.category_fk.toString() ?? "",
    },
  });

  const isLoading =
    isAddLoading || isTypeLoading || isUpdateLoading || isCategoriesLoading;

  const categoryOptions = categories?.data?.map(({ id, name }) => ({
    name: capitalizeText(name),
    value: String(id),
  }));

  const typeOptions = transactionTypes?.data?.map(({ id, type }) => ({
    name: capitalizeText(type),
    value: String(id),
  }));

  const isFormModified = useMemo(() => {
    if (!updateData) return true;

    const { amount, description, type, category } = formData;
    return (
      amount.value !== updateData.amount.toString() ||
      description.value !== updateData.description ||
      type.value !== updateData.transaction_type_fk.toString() ||
      category.value !== updateData.category_fk.toString()
    );
  }, [formData, updateData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!isFormModified) {
        return displayAlert({
          type: "warning",
          message: "Transaction information is the same! Modify it to update.",
        });
      }
      const { error } = await handleRequest();
      if (error) throw error;

      onSuccess();
      displayAlert({
        message: "Transaction added succesfully!",
        type: "success",
        duration: 2000,
      });
      resetForm();
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  const handleRequest = () => {
    const { amount, description, type, category } = formData;
    const data: AddTransactionProps = {
      amount: parseFloat(amount.value),
      description: description.value,
      transaction_type_fk: parseFloat(type.value),
      budget_fk: budgetId,
      category_fk: parseFloat(category.value),
    };

    return updateData
      ? updateTransaction({ ...data, id: updateData.id })
      : addTransaction(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <Field
        className="md:col-span-2"
        label="Description"
        name="description"
        type="text"
        value={formData.description.value}
        onInput={handleInputChange}
        required={formData.description.required}
        disabled={isLoading}
      />
      <Field
        label="Amount"
        name="amount"
        type="text"
        value={formData.amount.value}
        onInput={handleInputChange}
        required={formData.amount.required}
        inputMode="decimal"
        disabled={isLoading}
      />
      <Dropdown
        label="Category"
        name="category"
        options={categoryOptions}
        required={formData.category.required}
        value={formData.category.value}
        onChange={handleInputChange}
        disabled={isLoading}
        placeholder
      />
      <Dropdown
        label="Transaction Type"
        name="type"
        options={typeOptions}
        required={formData.type.required}
        value={formData.type.value}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <Button
        className="md:col-start-2 md:row-start-4 md:max-w-[150px] md:place-self-end"
        type="submit"
        disabled={isDisabled || isLoading || !isFormModified}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};
