import { useState } from "react";
import img from "../assets/images.png"
import axios from "axios";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


import "./product.css"
const Product = () => {
  const[preferenceId, setPreferenceId]=useState(null)

  initMercadoPago('TEST-e637f82d-36f2-4f36-bad7-14223f37bccd');

  const createPreference=async()=>{
    try {
      const response= await axios.post("http://localhost:3000/create_preference", {
        description: "bananita contenta",
        price:100,
        quantity:1
      })

      const {id}=response.data
      console.log(id)
      return id
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy= async()=>{
    const id=await createPreference()

    console.log("este es el id", id)
    if(id){
      setPreferenceId(id)
    }
  }
  return (
    <div className="card-product-container">
        <div className="card-product">
            <div className="card">
                <img src={img}/>
                <h3>Bananita contenta</h3>
                <p className="price">100 $</p>
                <button onClick={handleBuy}>buy</button>
                {preferenceId && <Wallet initialization={{ preferenceId }} />}
            </div>
        </div>
    </div>
  )
}

export default Product