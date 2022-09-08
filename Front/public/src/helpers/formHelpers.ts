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

export const recipeConsructor = (formObj: {
  [k: string]: FormDataEntryValue;
}): recipe => {
  const author = isString(formObj.author) ? formObj.author : '';
  const name = isString(formObj['recipe-name']) ? formObj['recipe-name'] : '';
  const description = isString(formObj.description) ? formObj.description : '';
  const [ingredients, steps] = extractIngredientsAndSteps(formObj);
  return {
    author,
    name,
    description,
    ingredients,
    steps,
  };
};

const extractIngredientsAndSteps = (formObj: {
  [k: string]: FormDataEntryValue;
}): [Ingredient[], Step[]] => {
  const ingredients = {} as { [k: number]: Ingredient };
  const steps = {} as { [k: number]: Step };
  Object.keys(formObj).forEach((key) => {
    const inputValue = formObj[key];
    if (isString(inputValue)) {
      // Handle Ingredients
      if (key.includes('ingredient'))
        updateIngredient(key, inputValue, ingredients);
      //   Habdle Steps
      if (key.includes('step')) updateSteps(key, inputValue, steps);
    }
  });
  return [Object.values(ingredients), Object.values(steps)];
};

const updateIngredient = (
  key: string,
  value: string,
  ingredients: { [k: number]: Ingredient }
): void => {
  if (!ingredients[getIndexAfterTag(key)])
    ingredients[getIndexAfterTag(key)] = {} as Ingredient;
  if (key.includes('name')) {
    ingredients[getIndexAfterTag(key)].name = value;
  }
  if (key.includes('amount')) ingredients[getIndexAfterTag(key)].amount = value;
  if (key.includes('units')) ingredients[getIndexAfterTag(key)].unit = value;
};

const updateSteps = (
  key: string,
  value: string,
  steps: { [k: number]: Step }
): void => {
  if (!steps[getIndexAfterTag(key)])
    steps[getIndexAfterTag(key)] = { stepTitle: '', steps: [] } as Step;
  if (key.includes('step-name')) steps[getIndexAfterTag(key)].stepTitle = value;
  if (key.includes('sub-step')) steps[getIndexAfterTag(key)].steps.push(value);
};

const getIndexAfterTag = (str: string): number => {
  const i = str.indexOf('#');
  if (i > -1) return Number(str[i + 1]);
  return 0;
};

const isString = (s: any): s is string => {
  return typeof s === 'string';
};
