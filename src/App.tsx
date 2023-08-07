// App.js
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Home from "./components/Home/Home";
import ProductDetails from "./components/products/productdetails";
import Cart from "./components/cart/cart";
import ProtectedRoutes from "./components/ProtectedRoutes";
import  Checkout from "./components/checkout/checkout";
import NavBar from "./components/navbar/hnavr";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    
   <div>
      <ToastContainer />
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
