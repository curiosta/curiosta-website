import type { Cart, Region } from "@medusajs/medusa";

// NOTE: explicitly add keys here so that app does not set or get data from local storage 'accidentally'.
// type LocalStorageKeys = "custId" | "region" | 'countryId';

type LocalStorageItems = {
  cartId: string;
  custId: string;
  countryId: number;
};

/**
 * A custom hook to simplify the usage of the local storage.
 *
 * @function
 * @returns `get` and `set` method which supports any kind of payload and automatically parses object using JSON.stringify().
 */
const useLocalStorage = () => {
  const setLocalStorage = <T extends keyof LocalStorageItems>(
    key: T,
    payload: LocalStorageItems[T] | null
  ) => {
    try {
      const value =
        typeof payload === "object" ? JSON.stringify(payload) : payload;

      // setting value with project prefix so it doesn't conflict with other apps in development.
      localStorage.setItem(`curiosta:${key}` as string, value as string);
    } catch (error) {
      console.warn(`Error setting local storage key "${key}": `, error);
    }
  };

  const getLocalStorage = <T extends keyof LocalStorageItems>(
    key: T
  ): LocalStorageItems[T] | null => {
    try {
      let value = localStorage.getItem(`curiosta:${key}` as string);
      if (value === null) {
        return null;
      }
      try {
        value = JSON.parse(value);
      } catch (error) { }
      return value as LocalStorageItems[T] | null;
    } catch (error) {
      console.warn(`Error getting local storage key "${key}": `, error);
      return null;
    }
  };

  const removeLocalStorage = (key: keyof LocalStorageItems) => {
    localStorage.removeItem(`curiosta:${key}` as string);
  };

  return {
    get: getLocalStorage,
    set: setLocalStorage,
    remove: removeLocalStorage,
  };
};

export default useLocalStorage;
