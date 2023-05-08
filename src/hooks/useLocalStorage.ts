// NOTE: explicitly add keys here so that app does not set or get data from local storage 'accidentally'.
type LocalStorageKeys = "cartId" | "custId";

/**
 * A custom hook to simplify the usage of the local storage.
 *
 * @function
 * @returns `get` and `set` method which supports any kind of payload and automatically parses object using JSON.stringify().
 */
const useLocalStorage = () => {
  const setLocalStorage = (key: LocalStorageKeys, payload: any) => {
    try {
      const value =
        typeof payload === "object" ? JSON.stringify(payload) : payload;
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Error setting local storage key "${key}": `, error);
    }
  };

  const getLocalStorage = (key: LocalStorageKeys) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.warn(`Error getting local storage key "${key}": `, error);
      return null;
    }
  };

  return { get: getLocalStorage, set: setLocalStorage };
};

export default useLocalStorage;
