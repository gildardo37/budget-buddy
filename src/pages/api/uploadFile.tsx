import { NextApiRequest, NextApiResponse } from "next";
import {
  Category,
  ConvertToTransaction,
  ConvertToTransactionReadOnly,
  TransactionType,
  UploadTransaction,
} from "@/types";
import {
  findDataByValue,
  getTransactionData,
  messages,
  validateJsonProps,
} from "@/services/UploadFile";
import csvtojson from "csvtojson";
import { capitalizeText } from "@/utils/strings";

interface Data {
  data?: UploadTransaction;
  message: string;
}

interface Body {
  file: string;
}

enum Files {
  JSON = "json",
  CSV = "csv",
}

const validFiles: Files[] = [Files.JSON, Files.CSV];
const validFilesString = validFiles.join(", ");

const validateTransactionProps = (data: ConvertToTransactionReadOnly) => {
  const fields: (keyof ConvertToTransactionReadOnly)[] = [
    "description",
    "amount",
    "category",
    "transactionType",
  ];
  return validateJsonProps(data, fields);
};

const convertFromJson = (fileData: string) => {
  const response = JSON.parse(fileData);
  if (!Array.isArray(response)) throw new Error(messages.wrongJson);

  return response;
};

const convertFromCsv = async (fileData: string) => {
  const jsonArrayObj = await csvtojson({
    checkType: true,
  }).fromString(fileData);
  return jsonArrayObj;
};

const convertData = (
  data: ConvertToTransactionReadOnly[],
  types: TransactionType[],
  categories: Category[]
): ConvertToTransaction[] => {
  return data.map((item) => {
    const { amount, category, description, transactionType } = item;
    const validJson = validateTransactionProps(item);
    if (!validJson) throw new Error(messages.wrongJson);

    const categoryId = findDataByValue(categories, "name", category)?.id;
    const typeId = findDataByValue(types, "type", transactionType)?.id;

    return {
      amount: amount,
      description: capitalizeText(description),
      category_fk: categoryId ?? 11,
      transaction_type_fk: typeId ?? 2,
    };
  });
};

const convertDataToReadable = (
  data: ConvertToTransaction[],
  types: TransactionType[],
  categories: Category[]
): ConvertToTransactionReadOnly[] => {
  return data.map(
    ({ amount, description, category_fk, transaction_type_fk }) => ({
      amount,
      description,
      category: categories.find(({ id }) => category_fk === id)?.name ?? "None",
      transactionType:
        types.find(({ id }) => transaction_type_fk === id)?.type ?? "Expense",
    })
  );
};

export default async function UploadFile(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      throw new Error(messages.wrongHttpMethod);
    }

    const body = req.body as Body;

    if (!body.file) {
      throw new Error(messages.wrongBody("'file'"));
    }

    const [metadata, base64Content] = body.file.split(";base64,");
    const fileData = Buffer.from(base64Content, "base64").toString("utf-8");
    const fileType = metadata.split("/")[1] as Files;

    if (!validFiles.includes(fileType)) {
      throw new Error(messages.invalidFile(fileType, validFilesString));
    }

    const fileFunctions = {
      [Files.JSON]: () => convertFromJson(fileData),
      [Files.CSV]: () => convertFromCsv(fileData),
    };
    const data = await fileFunctions[fileType]();
    const { types, categories } = await getTransactionData();
    const newData = convertData(data, types, categories);
    const readOnlyData = convertDataToReadable(newData, types, categories);

    return res.status(200).json({
      data: { newData, readOnlyData },
      message: messages.success,
    });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ message: error.message });
  }
}
