import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";

//eslint-disable-next-line
type ExtendedType = Record<string, any | string>;

interface Options<T> {
  onChange?: () => void;
  defaultParams?: T;
}

export const useFilterParams = <T extends ExtendedType>({
  onChange = () => undefined,
  defaultParams,
}: Options<T>) => {
  const router = useRouter();
  const { query } = router;
  const params = query as T;

  const handleOnChange = () => setTimeout(() => onChange(), 10);

  useEffect(() => {
    if (!defaultParams) return;
    const paramKeys = Object.keys(defaultParams);
    const areParamsValid = paramKeys.every((param) => param in query);

    if (!areParamsValid) {
      const newFilters: Record<string, string> = {};
      paramKeys.forEach((param) => (newFilters[param] = defaultParams[param]));
      router.replace({ query: { ...query, ...newFilters } });
    }
    //eslint-disable-next-line
  }, []);

  const setParams = (newFilters: Record<keyof T, string>) => {
    router.replace({ query: { ...query, ...newFilters } });
    handleOnChange();
  };

  const handleSetParam = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setParams({ [name]: value } as Record<keyof T, string>);
  };

  return { params, setParams, handleSetParam };
};
