import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Checkout() {

const productsincart= useSelector((state:any)=>state.cart.cart);
  return (
    <div style={{display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:'20%'}}>
      
        
        <h1>
        Thanku For Shopping With Us
        </h1>
         
        
      
    </div>

  );
}
