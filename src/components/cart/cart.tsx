import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, deleteItem } from "../../redux/actions/cartAction";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import  axios from "axios";
const Cart = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const routeChange=()=>{
    navigate('/checkout');
  }

  const products = useSelector((state: any) => state.cart.cart);
  console.log("products stire", products);

  if (!products || products.length === 0) {
    return <h1>Cart is empty</h1>;
  }
  function calculateTotal() {
    let total = 0;
    products.map((item: any) => {
      item.total= item.quantity * item.product.price;
      total =total+item.total;
    });
    return total;
    
  

  }

  function handleClose(product1: any) {
    if (product1.quantity < 2) {
      const deelet = products.filter(
        (item: any) => item.product.id !== product1.product.id
      );
      console.log("deelet", deelet);
      dispatch(deleteItem(deelet));
    } else {
      const cartItemsClone = [...products];
      const productForCart = { ...product1 };
      const existingProduct = cartItemsClone.find(
        (item) => item.product.id === product1.product.id
      );
      productForCart.quantity = existingProduct.quantity - 1;
      productForCart.total =
        productForCart.quantity * existingProduct.product.price;
      cartItemsClone.splice(
        cartItemsClone.indexOf(existingProduct),
        1,
        productForCart
      );
      dispatch(addItem(cartItemsClone));
    }
  }
  function handleAdd(product1: any) {
    const cartItemsClone = [...products];
    const productForCart = { ...product1 };
    if (
      cartItemsClone.length > 0 &&
      cartItemsClone?.find((item) => item.product.id === product1.product.id)
    ) {
      const existingProduct = cartItemsClone.find(
        (item) => item.product.id === product1.product.id
      );
      productForCart.quantity = existingProduct.quantity + 1;
      productForCart.total =
        productForCart.quantity * existingProduct.product.price;

      cartItemsClone.splice(
        cartItemsClone.indexOf(existingProduct),
        1,
        productForCart
      );
      dispatch(addItem(cartItemsClone));
    } else {
      productForCart.quantity = 1;
      productForCart.total = productForCart.product.price;
      cartItemsClone.push(productForCart);
      dispatch(addItem(cartItemsClone));
    }
  }
  function handleCheckout() {
    axios.post("http://localhost:3000/stripe", {
       items: products,
      
 
    }).then((response) => {
      console.log("asasasasasasa",response.data.url);
      if(response.data.url){
        
        window.location.href=response.data.url;
      }
    });
   }

  return (
  <div>
    <div className="main">

    
    {products.map((item: any) => (
        <div className="card-Content">
        
          <div >
            <img
              src={item.product.image_url}
              alt={item.product.name}
              height="200px"
              width="180px"
            />
          </div>
          <div>
            <h3 className="product-name">{item.product.name}</h3>
            <p className="product-price" >${item.total}</p>
            
           
          </div>
          <div>
          <button onClick={()=>{handleAdd(item)}}>+</button> 
          <p >{item.quantity}</p>
          <button onClick={()=>handleClose(item)} >-</button> 
          </div>
        </div>
      ))}
     
      </div>
      <div style={{marginLeft:'70%',marginTop:'10%',border:'lightgrey 1px solid',width:"25%"}}>
      <h2>Total Price: {calculateTotal()}</h2>
      <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
      </div>
      </div>

    
      
     
  );
      
};

export default Cart;
