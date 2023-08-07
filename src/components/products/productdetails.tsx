import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectedProduct } from "../../redux/actions/productAction";
import { useSelector } from "react-redux";
import { addItem } from "../../redux/actions/cartAction";
// import navigation
import { useNavigate } from "react-router-dom";

import {toast} from   'react-toastify';

const Productdetails = () => {
  let navigate = useNavigate();

  const [product1, setProduct1] = React.useState<any>({});
  const [cartbtn, setCartbtn] = React.useState<any>("Add to cart");

  const routechange = () => {
    navigate("/cart");
  };

  const cartItems = useSelector((state: any) => state.cart.cart);
  const handlecart = (product1: any) => {
    console.log("product1wdsd", product1);
    if (cartbtn === "Add to cart") {
      console.log("product1", product1);
      const cartItemsClone = [...cartItems];
      const productForCart = { ...product1 };
      // already add item alert
      if (
        cartItemsClone.length > 0 &&
        cartItemsClone?.find((item) => item.product.id === product1.product.id)
      ) {
        // const existingProduct = cartItemsClone.find(
        //   (item) => item.product.id === product1.product.id
        // );
        // productForCart.quantity = existingProduct.quantity + 1;
        // productForCart.total =
        //   productForCart.quantity * existingProduct.product.price;

        // cartItemsClone.splice(
        //   cartItemsClone.indexOf(existingProduct),
        //   1,
        //   productForCart
        // );
      
        toast.error("item already in cart", {
          position: toast.POSITION.TOP_LEFT,
        });
       // navigate("/cart");
       // dispatch(addItem(cartItemsClone));
      } else {
        productForCart.quantity = 1;
        productForCart.total = productForCart.product.price;
        cartItemsClone.push(productForCart);
        dispatch(addItem(cartItemsClone));
      }
      setCartbtn("Remove from cart");
    } else {
      setCartbtn("ADD TO CART");
    }
  };
  let product = useSelector((state: any) => state.product);
  console.log({ cartItems });
  const { id, name, price, description, image_url } = product;
  console.log({ product });

  const { productId } = useParams();
  console.log(productId);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProduct1(response.data);
        return dispatch(selectedProduct(response.data));
      });
  }, []);

  return (
  
      <div className="container-1">
        <div className="img-box">
          <img  src={product1.image_url} />
        </div>

        <div className="co">
          <h1 style={{ fontSize: "40px" }}>{product1.name}</h1>
          <h2 style={{ fontSize: "30px" }}>
          ${product1.price}
          </h2>
          <h3 style={{fontSize:'20px'}}> {product1.description}</h3>
          <div className="button">
            
          <button onClick={() => handlecart(product)}>{cartbtn}</button>
          <button onClick={routechange} >
           GO TO CART
          </button>
            </div>
        
        </div>
      </div>
    
  );
};
export default Productdetails;

// <div className="ui grid container">
//   <div className="ui placeholder segment">
//     <div className="ui two column stackable center aligned grid">
//       <div className="ui vertical divider"></div>
//       <div className="middle aligned row">
//         <div className="column lp">
//           <img
//             className="ui fluid image"
//             src={product1.image_url}
//             height={1000}
//             width={1000}
//           />
//         </div>
//         <div className="column rp">
//           <h1>{product1.name}</h1>
//           <h2>
//             <a className="ui teal tag label">${product1.price}</a>
//           </h2>
//           <h3 className="ui brown block header">{product1.description}</h3>

//           <button
//             onClick={() => handlecart(product)}
//             className="btn btn-outline-primary my-5"
//           >
//             {cartbtn}
//           </button>
//           <button onClick={routechange} className="primary-button">Cart </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
