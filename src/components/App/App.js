import React, { useEffect, useState }from 'react';
import './App.css';
import { getOrders, addOrder, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

export default function App() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrders().then(data => setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} getOrders={getOrders} setOrders={setOrders}/>
      </header>
      {orders ? <Orders deleteOrder={deleteOrder} setOrders={setOrders} getOrders={getOrders} orders={orders}/> : null}
      
    </main>
  );
}