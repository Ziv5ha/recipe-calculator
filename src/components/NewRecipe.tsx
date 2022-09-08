import React, { useEffect, useState } from 'react';
import { copyJsxObj, recipeConsructor } from '../helpers/formHelpers';
import IngredientInput from './IngredientInput';
import StepSection from './StepSection';

export default function NewRecipe() {
  const [ingredientsInputs, setIngredientsInputs] = useState<{
    [key: number]: JSX.Element;
  }>({});
  const [stepsSections, setStepsSections] = useState<{
    [key: number]: JSX.Element;
  }>({});

  const addIngredient = () => {
    setIngredientsInputs((prev) => {
      const prevCopy = copyJsxObj(prev);
      let i =
        Math.max(...Object.keys(prevCopy).map((numStr) => Number(numStr))) + 1;
      if (i === -Infinity) i = 1;

      prevCopy[i] = (
        <IngredientInput
          index={i}
          removeIngredient={removeIngredient}
          key={`ingredient #${i}`}
        />
      );
      return prevCopy;
    });
  };
  const removeIngredient = (i: number): void => {
    setIngredientsInputs((prev) => {
      const prevCopy = copyJsxObj(prev);
      delete prevCopy[i];
      return prevCopy;
    });
  };

  const addStepSection = () => {
    setStepsSections((prev) => {
      const prevCopy = copyJsxObj(prev);
      let i =
        Math.max(...Object.keys(prevCopy).map((numStr) => Number(numStr))) + 1;
      if (i === -Infinity) i = 1;

      prevCopy[i] = (
        <StepSection
          index={i}
          removeStep={removeStep}
          key={`stepSection #${i}`}
        />
      );
      return prevCopy;
    });
  };
  const removeStep = (i: number): void => {
    setStepsSections((prev) => {
      const prevCopy = copyJsxObj(prev);
      delete prevCopy[i];
      return prevCopy;
    });
  };

  useEffect(() => {
    setIngredientsInputs({
      1: (
        <IngredientInput
          index={1}
          removeIngredient={removeIngredient}
          key={'ingredient #1'}
        />
      ),
    });
    setStepsSections({
      1: (
        <StepSection index={1} removeStep={removeStep} key={'stepSection #1'} />
      ),
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const inputObj = Object.fromEntries(formData);
      console.log(recipeConsructor(inputObj));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new recipe</h2>
      <label htmlFor='recipe-name'>Recipe Name</label>
      <input id='recipe-name' name='recipe-name' required />
      <label htmlFor='author'>Author</label>
      <input id='author' name='author' required />
      <label htmlFor='description'>Description</label>
      <input id='description' name='description' type='textarea' required />
      <ul>
        {Object.values(ingredientsInputs)}
        <button type='button' onClick={addIngredient}>
          + new ingredient
        </button>
      </ul>
      <ol>
        {Object.values(stepsSections)}
        <button type='button' onClick={addStepSection}>
          + new step
        </button>
      </ol>
      <button type='submit'>Submit</button>
    </form>
  );
}
