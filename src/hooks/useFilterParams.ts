import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";

type Options<T> = {
  onChange?: () => void;
  defaultParams?: T;
};

export const useFilterParams = <T extends Record<string, string>>({
  onChange = () => undefined,
  defaultParams,
}: Options<T>) => {
  const router = useRouter();
  const { query } = router;
  const handleOnChange = () => setTimeout(() => onChange(), 10);

  const params = query as Record<keyof T, string>;

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
