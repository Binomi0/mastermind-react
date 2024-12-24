export const isEnterKeyPressed = (key: string) => key === "Enter";

export const isValidKey = (key: string, colorsLength: number) =>
  Number(key) <= colorsLength || key === "Enter";
