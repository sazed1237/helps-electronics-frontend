import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from "../common/api";
import Context from "../context/context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import '../App';
import countCartProduct from "../utils/countCartProduct";

const MainLayout = () => {
  const dispatch = useDispatch()
  const [countProduct, setCountProduct] = useState(0)



  const userDetails = async () => {
    const dataResponse = await fetch(summaryApi.userDetails.url, {
      method: summaryApi.userDetails.method,
      credentials: 'include'
    })
    const data = await dataResponse.json()
    // console.log(data)

    if (data.success) {
      dispatch(setUserDetails(data.data))
    }

  }

  const countAddToCartProduct = async () => {
    const dataResponse = await countCartProduct()
    console.log("mainleyout", dataResponse.data)
    setCountProduct(dataResponse?.data)

  }


  useEffect(() => {
    userDetails() //user details
    countAddToCartProduct() //cart product count

  }, [])

  return (
    <div>
      <Context.Provider value={{
        userDetails, //user details fetch
        countAddToCartProduct, // current user cart product count
        countProduct
      }} >

        <ToastContainer
          position="top-right"
        />

        <Header></Header>
        <div className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>

      </Context.Provider>
    </div>

  );
};

export default MainLayout;
