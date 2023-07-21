import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NextPage } from "next";
import { useAddBudget, useMyBudgets } from "@/client/user-client";
import { Budget } from "@/types";
import { cleanPriceString } from "@/utils/numbers";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { ListItem } from "@/components/ListItem";
import { Loading } from "@/components/Loading";
import { Header } from "@/components/Header";
import { useAlert } from "@/hooks/useAlert";

interface FormData {
  description: string;
  ammount: string;
}

const BudgetPage: NextPage = () => {
  const { displayAlert } = useAlert();
  const { data: budgets, isLoading, error } = useMyBudgets();
  const { mutateAsync: addBudget } = useAddBudget();
  const [formData, setFormData] = useState<FormData>({
    description: "",
    ammount: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { ammount, description } = formData;
      const { error } = await addBudget({
        ammount: parseFloat(ammount),
        description,
      });
      if (error) throw error;
      displayAlert({ message: "Budget added succesfully!", type: "success" });
      setFormData({ description: "", ammount: "" });
    } catch (e) {
      console.error(e);
      const { message } = e as Error;
      displayAlert({ message, type: "error" });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "ammount" ? cleanPriceString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const isDisabled = useMemo<boolean>(() => {
    return !formData.ammount || !formData.description || isLoading;
  }, [formData, isLoading]);

  useEffect(() => {
    if (error) {
      const { message } = error as Error;
      displayAlert({ message, type: "error" });
    }
    //eslint-disable-next-line
  }, [error]);

  return (
    <section className="flex flex-col gap-4">
      <Header title="Add budget" />
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Field
          label="Description"
          name="description"
          type="text"
          value={formData.description}
          onInput={handleInputChange}
          required
        />
        <Field
          label="Ammount"
          name="ammount"
          type="text"
          value={formData.ammount}
          onInput={handleInputChange}
          required
          inputMode="decimal"
        />
        <Button type="submit" disabled={isDisabled}>
          Submit
        </Button>
      </form>
      <h2 className="text-2xl font-semibold pt-8">My budgets</h2>
      {isLoading ? (
        <Loading />
      ) : budgets?.data?.length ? (
        <ul className="flex flex-col gap-4">
          {([...budgets.data].reverse() as Budget[]).map(
            ({ id, ammount, description, created_at }) => (
              <ListItem
                key={id}
                href={`/budget/${id}`}
                ammount={ammount}
                date={created_at}
                description={description}
              />
            )
          )}
        </ul>
      ) : (
        <p className="text-gray-500">No budgets added yet, start adding one.</p>
      )}
    </section>
  );
};

export default BudgetPage;
