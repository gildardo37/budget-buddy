import React, { useState } from "react";
import { AddTransactionProps, BudgetID, UploadTransaction } from "@/types";
import { handleErrors } from "@/utils/errors";
import {
  useAddBulkTransaction,
  useUploadTransactionFile,
} from "@/hooks/useApi";
import { useAlert } from "@/hooks/useAlert";
import { CodeViewer } from "@/components/CodeViewer";
import { InputFile } from "@/components/Field/InputFile";
import { Button } from "@/components/Button";
import { CustomDropdown } from "../Field/CustomDropdown";
import { downloadFile } from "@/utils/file";

interface Props {
  budgetId: BudgetID;
  onSuccess: () => void;
}

export const UploadTransactionForm: React.FC<Props> = ({
  budgetId,
  onSuccess,
}) => {
  const { displayAlert } = useAlert();
  const [data, setData] = useState<UploadTransaction>();
  const { mutateAsync: addTransactions, isLoading: isAddLoading } =
    useAddBulkTransaction(budgetId);
  const { mutateAsync: uploadFile, isLoading: isUploadLoading } =
    useUploadTransactionFile();

  const isLoading = isAddLoading || isUploadLoading;

  const handleOnChange = async (
    value: string | ArrayBuffer | null | undefined
  ) => {
    if (!value) return;
    try {
      const res = await uploadFile({ file: value });
      setData(res.status === 200 ? res.data.data : undefined);
    } catch (e) {
      handleErrors(e, displayAlert);
      setData(undefined);
    }
  };

  const handleSubmit = async () => {
    if (!data?.newData) return;
    try {
      const newData: AddTransactionProps[] = data?.newData.map((item) => ({
        ...item,
        budget_fk: budgetId,
      }));
      const res = await addTransactions(newData);
      if (res.error) throw res.error;

      setData(undefined);
      onSuccess();
      displayAlert({
        message: "Transactions added succssfully!",
        type: "success",
      });
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  const downloadJson = () => {
    downloadFile(
      "/load-transaction-json-template.json",
      "load-transaction-json-template.json"
    );
  };

  const downloadCsv = () => {
    downloadFile(
      "/load-transaction-csv-template.csv",
      "load-transaction-csv-template.csv"
    );
  };

  const dropdownOptions = [
    { name: "JSON", action: downloadJson },
    { name: "CSV", action: downloadCsv },
  ];

  return (
    <div className="flex flex-col gap-4">
      <form className="grid gap-4 md:grid-cols-2">
        <p>Make sure the file is a JSON or CSV.</p>
        <CustomDropdown
          labelContent={<p className="text-blue-500">Download template</p>}
          options={dropdownOptions}
          position="bottom-left"
          className="place-self-end"
        />
        <InputFile
          accept=".json, .csv"
          onChange={handleOnChange}
          isLoading={isLoading}
        />
      </form>
      <CodeViewer
        title="Preview"
        code={JSON.stringify(data?.readOnlyData ?? {}, null, 2)}
      />
      <Button
        className="max-w-[150px] place-self-end"
        onClick={handleSubmit}
        disabled={!data?.newData || isLoading}
        isLoading={isLoading}
      >
        Submit data
      </Button>
    </div>
  );
};
