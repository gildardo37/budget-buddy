import { getCategories, getTransactionType } from "./api";

export const messages = {
  success: "Request successfully",
  wrongHttpMethod: "This HTTP method is not available.",
  wrongJson: "Wrong type of JSON.",
  fetchError: "Error while fetching data",
  wrongBody: (values: string) =>
    `These properties are missing in body: ${values}.`,
  invalidFile: (fileType: string, files: string) =>
    `${fileType} is not a valid file, must be ${files}.`,
};

export const readFile = () => {
  return {};
};

export const validateJsonProps = <T extends object>(
  jsonData: T,
  properties: string[]
) => {
  for (const property of properties) {
    if (!(property in jsonData)) {
      return false;
    }
  }
  return true;
};

export const getTransactionData = async () => {
  const [typeRes, categoryRes] = await Promise.allSettled([
    await getTransactionType(),
    await getCategories(),
  ]);

  if (typeRes.status === "rejected" || categoryRes.status === "rejected") {
    throw new Error(messages.fetchError);
  }

  const { value: types } = typeRes;
  const { value: categories } = categoryRes;

  if (types.error || categories.error) {
    throw types.error ?? categories.error;
  }

  return { types: types.data, categories: categories.data };
};

export const findDataByValue = <T extends object>(
  data: T[],
  property: keyof T,
  value: string
) => {
  return data.find(
    (item) =>
      (item[property] as string).toLowerCase() === value.toLowerCase() ||
      (item[property] as string).toLowerCase().includes(value)
  );
};
