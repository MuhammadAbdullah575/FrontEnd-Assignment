import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// Create a new CSS file for styling
import './products.css';
import  {useSelector} from 'react-redux';
import PorductComponent from './productcomponent';
import {setProducts} from '../../redux/actions/productAction';
const Products = () => {
  const products =useSelector ((state:any)=>state);
  const dispatch=useDispatch();
  console.log(products);
  
  useEffect(() => {
    axios.get("http://localhost:3000/products/").then((response) => {
     console.log(response.data);
      dispatch(setProducts(response.data));
      
  });
  }, []);

  return (
    <div className="ui grid container">
      <PorductComponent/>
  </div>
  )
  }

export default Products;
