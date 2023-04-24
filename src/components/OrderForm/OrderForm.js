import React, { useState } from 'react';

export default function OrderForm({ addOrder, getOrders, setOrders }) {

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [triedToSubmitWithoutInfo , setTriedToSubmitWithoutInfo] = useState(false);


  const handleSubmit = e => {
    e.preventDefault();
    if (ingredients.length && name) {
      addOrder({name: name, ingredients: ingredients})
        .then(() => getOrders().then(data => setOrders(data.orders)));
        setTriedToSubmitWithoutInfo(false);
      clearInputs();
    } else {
      setTriedToSubmitWithoutInfo(true);
      return;
    }
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleIngredientChange = (e) => {
    e.preventDefault();
    const ingredient = e.target.name
    if (!ingredients.includes(ingredient)) {
      ingredients.length ? setIngredients([...ingredients, ingredient]) : setIngredients([ingredient])

    }
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
    <form  >
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { ingredients.length ? ingredients.join(', ') : 'Nothing selected' }</p>

      {triedToSubmitWithoutInfo ? <p style={{color: 'red'}}>Oops, you must add a name and ingredients before submitting</p> : null}

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}