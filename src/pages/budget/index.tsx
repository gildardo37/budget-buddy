import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { NextPage } from "next";
import { useAddBudget, useBudget } from "@/client/user-client";
import { Budget } from "@/types";
import { cleanPriceString } from "@/utils/numbers";
import { Button } from "@/components/Button";
import { ErrorLabel } from "@/components/ErrorLabel";
import { Field } from "@/components/Field";
import { ListItem } from "@/components/ListItem";
import { Loading } from "@/components/Loading";

interface FormData {
  description: string;
  ammount: string;
}

const BudgetPage: NextPage = () => {
  const { mutateAsync: addBudget } = useAddBudget();
  const { data: budgets, isLoading, error } = useBudget();
  const [errorMessage, setErrorMessage] = useState("");
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
      if (error) {
        return setErrorMessage(error.message);
      }
      setFormData({ description: "", ammount: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "ammount" ? cleanPriceString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const isDisabled = useMemo<boolean>(() => {
    console.log(!formData.ammount || !formData.description || isLoading);
    return !formData.ammount || !formData.description || isLoading;
  }, [formData, isLoading]);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold py-4">Add budget</h2>
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
        {errorMessage || error ? (
          <ErrorLabel>{errorMessage || "Something failed"}</ErrorLabel>
        ) : null}
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
        <div>No budgets added yet</div>
      )}
    </section>
  );
};

export default BudgetPage;
