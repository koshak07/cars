
import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../helpers/API";
import { calcSubPrice, calcTotalPrice } from "../helpers/const";


export const userContext = createContext();
const INIT_STATE = {
  cars: null,
  carDetails: null,
  carsCountInCart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cars.length
    : 0,
    cart: null,
  
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CARS":
      return { ...state, cars: action.payload };
    case "GET_DETAILS":
      return { ...state, carDetails: action.payload };
    case "ADD_AND_DEL_IN_CART":
      return { ...state, carsCountInCart: action.payload };
    case "GET_CART":
        return {...state, cart: action.payload}  ;
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const getCars = async () => {
    try {
      let filter = window.location.search;
      const response = await axios(`${API}${filter}`);
      let action = {
        type: "GET_CARS",
        payload: response.data,
      };
      dispatch(action);
      resetCurrentPage()
    } catch (e) {
      console.log(e);
    }
  };


    
  const getDetails = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_DETAILS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);

    }
  };

  //cart and sum price
  
  const addAndDelInCart = (car) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);

    if (!cart) {
      cart = {
        cars: [],
        totalPrice: 0,
      };
    }
    let product = {
      car: car,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.cars.filter((i) => {
      return i.car.id === car.id;
    });
    if (checkArr.length === 0) {
      cart.cars.push(product);
    } else {
      cart.cars = cart.cars.filter((i) => {
        return i.car.id !== car.id;
      });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DEL_IN_CART",
      payload: cart.cars.length,
    };
    dispatch(action);
  };
  const updateBadgeLenght = () => {
    let cart = localStorage.getItem('cart')
    let count = cart ? JSON.parse(cart).cars.lenght : 0;
    dispatch({
      type: "ADD_AND_DEL_IN_CART",
      payload: count
    })

  }
  //check cart
  const checkInCart = (id)=>{
      let cart = JSON.parse(localStorage.getItem("cart"));
      if(!cart){
          cart ={
              cars: [],
              totalPrice: 0,
          }
      }
      let checkArr = cart.cars.filter((i)=>{
          return i.car.id === id
      })
      if(checkArr.length === 0){
          return false
      }else{
          return true
      }
  }
  //getting cart from localstorage
  const getCart =()=>{
      let cart = JSON.parse(localStorage.getItem('cart'))
      
      if(!cart){
        cart ={
          cars: [],
          totalPrice: 0,
        }
      }
      let action = {
        type: "GET_CART",
        payload: cart,
      }
      dispatch(action)
  }
  //change count in cart

  const changeCountInCart = (count, id)=>{
      if(count<1) {
         return 
      }
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart.cars = cart.cars.map(i=>{
          if(i.car.id === id){
              i.count = count;
              i.subPrice = calcSubPrice(i)
          }
          return i
      })
      cart.totalPrice = calcTotalPrice(cart)
      localStorage.setItem('cart', JSON.stringify(cart))
      getCart()
  }
  

  //pagination
  const [post, setPost] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(6)
  useEffect(()=>{
    if(state.cars){
      const data = state.cars
      setPost(data)
    }

  }, [state.cars])
  const numberOfLastPost = currentPage * postPerPage
  const numberOfFirstPost = numberOfLastPost - postPerPage
  const currentPost = post.slice(numberOfFirstPost, numberOfLastPost)
  const totalPosts = post.length

  const handlePage = (newPage)=>{
    setCurrentPage(newPage)
  }
  function resetCurrentPage(){
    setCurrentPage(1)
  }

  return (

    <userContext.Provider
      value={{
        getCars,
        getDetails,
        addAndDelInCart,
        checkInCart,
        getCart,
        changeCountInCart,
        handlePage,
        updateBadgeLenght,
        cars: state.cars,
        carDetails: state.carDetails,
        carsCountInCart: state.carsCountInCart,
        cart: state.cart,
        totalPosts,
        currentPost,
        postPerPage,
        currentPage,
      }}
    >
      {props.children}
    </userContext.Provider>
  );

};

export default UserContextProvider;
