import React, { useState, useEffect } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemtoCart, removeItemfromCart } from './helper/cartHelper';

const Card=({product,AddtoCart=true,
removeFromcart=false,setReload=f=>{return f},reload=undefined})=>{


    const [redirect,setRedirect]=useState(false)

    const cardTitle = product ? product.name: " A photo from pixel"
    const cardDescription = product ? product.description: " Default Description"
    const cardPrice = product ? product.price: " Default"

    const addtocart = ()=>{
        addItemtoCart(product,()=>setRedirect(true))
    }
    const getAredirect=(redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }
    const ShowAddtocart = (AddtoCart)=>{
        return (
            AddtoCart && (
                <button
                    onClick={addtocart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
            )
        )
    }
    
    const ShowRemovefromCart=(removeFromcart)=>{
        return(
            removeFromcart && (
            <button
                    onClick={() => {
                        removeItemfromCart(product._id)
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
            )
        )
    }
    
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {getAredirect(redirect)}
            <ImageHelper product={product}/>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {ShowAddtocart(AddtoCart)}
                </div>
                <div className="col-12">
                  {ShowRemovefromCart(removeFromcart)}
                </div>
              </div>
            </div>
          </div>
        );
      };




export default Card