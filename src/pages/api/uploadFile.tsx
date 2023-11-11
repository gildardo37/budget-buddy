import { messages } from "@/services/UploadFile";
import { getCategories, getTransactionType } from "@/services/api";
import {
  Category,
  ConvertToTransaction,
  ConvertToTransactionReadOnly,
  TransactionType,
} from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  data?: any;
  message: string;
}

interface Body {
  file: string;
}

enum Files {
  JSON = "json",
  CSV = "csv",
  XLS = "xls",
  XLSX = "xlsx",
}

const validFiles: Files[] = [Files.JSON, Files.CSV, Files.XLS, Files.XLSX];
const validFilesString = validFiles.join(", ");

// const validateTransaction = (data: Record<string, unknown>) => {
//   const fields = ["description", "amount", "transaction_type", "categories"];
//   const keys = Object.keys(data);

//   for (const key of data) {
//     if (!keys.includes(key)) {
//       return false;
//     }
//   }
//   return true;
// };

const getJsonFile = (buffer: Buffer) => {
  const decodedString = buffer.toString("utf-8");
  return JSON.parse(decodedString);
};

const getCsvFile = (buffer: Buffer) => {
  const decodedString = buffer.toString("utf-8");
  const jsonData = JSON.parse(decodedString);
  return { data: jsonData };
};

const getXlsFile = (buffer: Buffer) => {
  const decodedString = buffer.toString("utf-8");
  const jsonData = JSON.parse(decodedString);
  return { data: jsonData };
};

const getXlsxFile = (buffer: Buffer) => {
  const decodedString = buffer.toString("utf-8");
  try {
    const jsonData = JSON.parse(decodedString);
    return { data: jsonData };
  } catch (error) {
    return { data: (error as Error).message };
  }
};

const convertData = (
  data: any,
  types: TransactionType[],
  categories: Category[]
) => {
  if (!Array.isArray(data)) throw new Error("Wrong type of JSON.");

  return data.map((item) => {
    const newData = {} as ConvertToTransaction;
    for (const key in item) {
      const value = item[key];
      if (key === "amount") {
        newData.amount = value;
      } else if (key === "description") {
        newData.description = value;
      } else if (key === "category") {
        const categoryId = categories.find(
          ({ name }) =>
            name.toLowerCase() === value.toLowerCase() ||
            name.toLowerCase().includes(value)
        )?.id;
        newData.category_fk = categoryId ?? 11;
      } else if (key === "transactionType") {
        const typeId = types.find(
          ({ type }) =>
            type.toLowerCase() === value.toLowerCase() ||
            type.toLowerCase().includes(value)
        )?.id;
        newData.transaction_type_fk = typeId ?? 2;
      }
    }
    return newData;
  });
};

const convertDataToRead = (
  data: ConvertToTransaction[],
  types: TransactionType[],
  categories: Category[]
) => {
  if (!Array.isArray(data)) throw new Error("Wrong type of JSON.");

  return data.map(
    ({ amount, description, category_fk, transaction_type_fk }) => {
      return {
        amount,
        description,
        category: categories.find(({ id }) => category_fk === id)?.name,
        transactionType: types.find(({ id }) => transaction_type_fk === id)
          ?.type,
      };
    }
  ) as ConvertToTransactionReadOnly[];
};

const UploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.method !== "POST") {
      throw new Error(messages.wrongHttpMethod);
    }

    const body = req.body as Body;
    const [metadata, base64Content] = body.file.split(";base64,");
    const buffer = Buffer.from(base64Content, "base64");
    const fileType = metadata.split("/")[1] as Files;

    if (!validFiles.includes(fileType)) {
      throw new Error(messages.invalidFile(fileType, validFilesString));
    }

    const fileFunctions = {
      [Files.JSON]: getJsonFile(buffer),
      [Files.CSV]: getCsvFile(buffer),
      [Files.XLS]: getXlsFile(buffer),
      [Files.XLSX]: getXlsxFile(buffer),
    };

    const data = fileFunctions[fileType];
    const types = await getTransactionType();
    const categories = await getCategories();

    if (types.error || categories.error) {
      throw types.error ?? categories.error;
    }

    const newData = await convertData(data, types.data, categories.data);
    const readOnlyData = await convertDataToRead(
      newData,
      types.data,
      categories.data
    );

    return res.status(200).json({
      data: { newData, readOnlyData },
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default UploadFile;
