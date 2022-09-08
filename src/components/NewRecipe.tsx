import React, { useEffect, useState } from 'react';

export default function NewRecipe() {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new recipe</h2>
      <label htmlFor='recipe-name'>Recipe Name</label>
      <input id='recipe-name' name='recipe-name' required />
      <label htmlFor='author'>Author</label>
      <input id='author' name='author' required />
      <label htmlFor='description'>Description</label>
      <input id='description' name='description' type='textarea' required />
    </form>
  );
}
