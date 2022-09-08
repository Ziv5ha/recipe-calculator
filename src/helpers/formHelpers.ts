export const copyJsxObj = (obj: {
  [key: number]: JSX.Element;
}): { [key: number]: JSX.Element } => {
  const copy = {} as { [key: number]: JSX.Element };
  Object.keys(obj).forEach((keyStr) => {
    const keyNum = Number(keyStr);
    if (!isNaN(keyNum)) copy[keyNum] = obj[keyNum];
  });
  return copy;
};

