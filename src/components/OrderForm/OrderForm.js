import React, { useState, useEffect } from 'react';

export default function OrderForm() {

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleIngredientChange = (e) => {
    const ingredient = e.target.name
    ingredients.length ? setIngredients([...ingredients, ingredient]) : setIngredients([ingredient])
  }

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];

  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)}>
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        required
        onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { ingredients.length ? ingredients.join(', ') : 'Nothing selected' }</p>

      <button onClick={e => this.handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}