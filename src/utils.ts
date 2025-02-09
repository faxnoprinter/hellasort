export const generateArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};