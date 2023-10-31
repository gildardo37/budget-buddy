import React, { FormEvent, useMemo } from "react";
import {
  useAddTransaction,
  useGetTransactionType,
  useUpdateTransaction,
} from "@/services/useApi";
import { Transaction } from "@/types";
import { handleErrors } from "@/utils/errors";
import { capitalizeText } from "@/utils/strings";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";

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

  const { mutateAsync: addTransaction, isLoading: isAddLoading } =
    useAddTransaction(budgetId);

  const { mutateAsync: updateTransaction, isLoading: isUpdateLoading } =
    useUpdateTransaction(budgetId, updateData?.id.toString() ?? "");

  const { formData, resetForm, isDisabled, handleInputChange } = useForm({
    description: { value: updateData?.description ?? "" },
    amount: { value: updateData?.amount.toString() ?? "" },
    type: {
      value:
        updateData?.transaction_type.id.toString() ??
        transactionTypes?.data?.[0].id.toString() ??
        "2",
    },
  });

  const isLoading = isAddLoading || isTypeLoading || isUpdateLoading;

  const selectOptions = transactionTypes?.data?.map(({ id, type }) => ({
    name: capitalizeText(type),
    value: String(id),
  }));

  const isFormModified = useMemo(() => {
    if (!updateData) return true;

    const { amount, description, type } = formData;
    return (
      amount.value !== updateData.amount.toString() ||
      description.value !== updateData.description ||
      type.value !== updateData.transaction_type_fk.toString()
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
    const { amount, description, type } = formData;
    const data = {
      amount: parseFloat(amount.value),
      description: description.value,
      transaction_type_fk: parseFloat(type.value),
      budget_fk: parseFloat(budgetId),
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
        label="Transaction Type"
        name="type"
        options={selectOptions}
        required={formData.type.required}
        value={formData.type.value}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <Button
        className="md:col-start-2 md:max-w-[150px] md:place-self-end"
        type="submit"
        disabled={isDisabled || isLoading || !isFormModified}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};
