import React, { useState, useEffect } from 'react'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'



export default function Home()
{
    const [products,setProducts]=useState([])
    const [error,setErros]=useState(false)

    const loadAllProducts=()=>{
        getProducts().then(data=>{
            if(data.error)
            setErros(data.error)
            else
            {
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        loadAllProducts()
    },[])
    return(
        <Base title="Home Page" description="Welcome to E-Store">
           <div className="row text-center">
    <h1 className="text-white">All of T-shirts</h1>
        <div className="row">
            {products.map((product,index)=>{
                return(
                    <div key={index} className="col-3 mb-4">
                        <Card product={product}/>
                    </div>
                )
            })}
        </div>
            </div>
        </Base>
    )
}