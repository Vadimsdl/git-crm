interface ILocalStorageItem {
  key: string;
  value: string | boolean | number;
}

interface ILocalStorageKey {
  key: string;
}

export const setLocalStorageItem = ({
  key,
  value,
}: ILocalStorageItem): void => {
  const stringify = JSON.stringify(value);
  localStorage.setItem(key, stringify);
};

export const setLocalStorageItems = (arr: ILocalStorageItem[]): void => {
  arr.forEach((item) => {
    setLocalStorageItem({ key: item.key, value: item.value });
  });
};

export const removeLocalStorageItem = ({ key }: ILocalStorageKey): void =>
  localStorage.removeItem(key);

export const getLocalStorageItem = ({ key }: ILocalStorageKey): string => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : "";
};

export const getLocalStorageItems = (arr: ILocalStorageKey[]): string[] =>
  arr.map((item) => getLocalStorageItem({ key: item.key }));
