import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'

function App() {

  const [product,setProduct]=useState({
    name:'react from FB',
    price:10,
    productBy:"FaceBook"
  })

  const makepayment = token=>{
    const body={
      token,product
    }
    const headers={
      "Content-Type":"application/json"
    }
    return fetch(`http://localhost:8000/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response=>{
      console.log(response)
      const {status}=response
      console.log(status)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
      
        </a>
        <StripeCheckout 
        stripeKey="pk_test_51H5YQTIheirNh1zStQeRg0sBDzTlxqH6bmKTcbSJWecwYjZ1ZrQVqOcePoDr7DEsTUMpPPwuZyWBav3DjcYOM3e400swaUqGVx"
        token={makepayment}
        name="Buy React"
        amount={product.price*100}
        >
<button className="btn-large green">Buy React in {product.price}$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
