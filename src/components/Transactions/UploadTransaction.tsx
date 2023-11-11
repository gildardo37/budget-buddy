import React, { useState } from "react";
import axios from "axios";
import { Modal } from "../Modal";
import { useModal } from "@/hooks/useModal";
import { Button } from "@/components/Button";
import { InputFile } from "../Field/InputFile";
import { CodeViewer } from "../CodeViewer";
import {
  AddTransactionProps,
  BudgetID,
  ConvertToTransaction,
  ConvertToTransactionReadOnly,
} from "@/types";
import { useAddBulkTransaction } from "@/hooks/useApi";

interface Props {
  budgetId: BudgetID;
}

interface ResponseData {
  data: Data;
}

interface Data {
  newData: ConvertToTransaction[];
  readOnlyData: ConvertToTransactionReadOnly[];
}

export const UploadTransaction: React.FC<Props> = ({ budgetId }) => {
  const { mutateAsync: addTransactions } = useAddBulkTransaction(budgetId);
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState<Data>();

  const handleOnChange = async (
    value: string | ArrayBuffer | null | undefined
  ) => {
    const url = "/api/uploadFile";
    const data = { file: value };
    const res = await axios.post<ResponseData>(url, data);
    console.log(res.data);
    if (res.status === 200) {
      setData(res.data.data);
    }
  };

  const handleSubmit = async () => {
    if (!data?.newData) return;
    const newData: AddTransactionProps[] = data.newData.map((item) => ({
      ...item,
      budget_fk: budgetId,
    }));
    const res = await addTransactions(newData);
    console.log(res);
    setData(undefined);
    closeModal();
  };

  return (
    <>
      <Button
        className="md:max-w-lg"
        buttonType="secondary"
        onClick={openModal}
      >
        Load from file
      </Button>
      <Modal
        title="Upload CSV or JSON file"
        onClose={closeModal}
        modalOpen={isOpen}
      >
        <div className="flex flex-col gap-4">
          <form className="grid md:grid-cols-2">
            <InputFile
              accept=".json, .csv, .xls, .xlsx"
              onChange={handleOnChange}
            />
          </form>
          {data ? (
            <>
              <p>This is how your data looks like, is it all correct?</p>
              <CodeViewer code={JSON.stringify(data.readOnlyData, null, 2)} />
              <Button
                className="max-w-[150px] place-self-end"
                onClick={handleSubmit}
              >
                Submit data
              </Button>
            </>
          ) : null}
        </div>
      </Modal>
    </>
  );
};
