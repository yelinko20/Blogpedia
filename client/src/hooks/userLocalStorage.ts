export const useLocalStorage = (key: string) => {
  function setItem(value: unknown) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  function getItem() {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return item ?? undefined;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function removeItem() {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  return { setItem, getItem, removeItem };
};
