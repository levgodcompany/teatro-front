export const persistLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};



export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
