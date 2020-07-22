import React, { useState, useEffect } from 'react'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'

import { loadCart } from './helper/cartHelper'
import StripeCheckout from './stripcheckout'
import PaymentB from './PaymentB'



export default function Cart()
{
   const [products,setproducts]=useState([])
   const [reload,setReload]=useState(false)

   useEffect(()=>{
       setproducts(loadCart())
   },[reload])
   const loadAllProduct= products=>{
       return(
           <div>
               <h2>This section is to load products</h2>
               {products.map((product,index)=>(
                   <Card key={index}
                   product={product} AddtoCart={false} removeFromcart={true}
                   setReload={setReload} reload={reload}/>
               ))}
           </div>
       )
   }

   const loadCheckout=()=>{
    return(
        <div>
            <StripeCheckout 
            products={products} setReload={setReload}/>
            <PaymentB/>
        </div>

        
    )
}

  
    return(
        <Base title="Cart Page" description="Ready to check out">
        <div className="row text-center">
            <div className="col-6">
                {products.length>0? loadAllProduct(products):(<h3>No products in cart</h3>)}
            </div>
            <div className="col-6">
                {loadCheckout()}
            </div>
          
        </div>
            
        </Base>
    )
}