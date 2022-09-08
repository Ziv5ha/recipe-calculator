/// <reference types="react-scripts" />
interface Ingredient {
  name: string;
  amount: number | string;
  unit: string;
}
interface Step {
  stepTitle: string;
  steps: string[];
}
interface recipe {
  name: string;
  author: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
}
