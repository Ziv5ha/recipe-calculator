import React from 'react';

export default function IngredientInput({
  index,
  removeIngredient,
}: {
  index: number;
  removeIngredient: (i: number) => void;
}) {
  return (
    <li>
      <input name={`ingredient-name #${index}`} required />
      <input name={`ingredient-amount #${index}`} type='number' required />
      <input name={`ingredient-units #${index}`} type='text' list='units' />
      <datalist id='units'>
        <option>Tablespoons</option>
        <option>Teaspoons</option>
        <option>Pinch</option>
        <option>Drops</option>
        <option>Cups</option>
      </datalist>
      <button
        type='button'
        onClick={() => {
          removeIngredient(index);
        }}
      >
        remove ingredient
      </button>
    </li>
  );
}
