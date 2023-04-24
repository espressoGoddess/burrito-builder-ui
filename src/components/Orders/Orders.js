import React from 'react';
import './Orders.css';

export default function Orders({ orders, deleteOrder, getOrders, setOrders }) {

  const handleDoneClick = (e) => {
    e.preventDefault();
    deleteOrder(e.target.dataset.id)
      .then(res => {
        if (res.status === 204) {
          getOrders().then(data => setOrders(data.orders))
          .catch(err => console.error('Error fetching:', err));
        }
      })
  }

  const orderEls = orders.map(order => {
    return (
      <div key={order.id} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <button onClick={(e) => handleDoneClick(e)} key={order.id} data-id={order.id}>Done</button>
      </div>
    )
  });

  return (
    <section className='Orders'>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}
