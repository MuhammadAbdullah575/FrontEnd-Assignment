
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const Productcomponent = () => {
  const products =useSelector ((state:any)=>state.allProducts.products);
 
  const renderList=products.map((product:any)=>{
    console.log("products of the main page",products);
    const {id,name,price,image_url}=product;
    return (
      <div className="four wide column" key={id} >
        <Link to={`/product/${id}`}>
   
      <div className="ui link cards">
        <div className="card">
          <div >
          <img className="image-card" src={image_url} alt={name} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
            <div className="meta price">$ {price}</div>
          </div>
        </div>
      </div>
      </Link>
      </div>
    )
  }
  )
  return (
    <div className="wrapper">
      {renderList}
    </div>
  )
}

export default Productcomponent
