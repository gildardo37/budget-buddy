export const useStorage = <T>(key: string) => {
  const getStorage = () => {
    if (typeof window !== undefined) {
      return JSON.parse(localStorage.getItem(key) || "{}") as T;
    }
  };

  const setStorage = (value: T) => {
    if (typeof window !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return {
    getStorage,
    setStorage,
  };
};
