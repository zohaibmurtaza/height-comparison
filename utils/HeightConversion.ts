export const cmToFtAndInch = (cm: number) => {
  const ft = Math.floor(cm / 30.48);
  const inches = Math.round((cm % 30.48) / 2.54);
  return { ft, in: inches };
};

export const ftToCm = (ft: number, inch: number) => {
  return ft * 30.48 + inch * 2.54;
};
