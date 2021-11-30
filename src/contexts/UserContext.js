
import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../helpers/API";
import { calcSubPrice, calcTotalPrice } from "../helpers/const";


export const userContext = createContext();
const INIT_STATE = {
  rooms: null,
  roomDetails: null,
  roomsCountInCart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).rooms.length
    : 0,
    cart: null,
  
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_ROOMS":
      return { ...state, rooms: action.payload };
    case "GET_DETAILS":
      return { ...state, roomDetails: action.payload };
    case "ADD_AND_DEL_IN_CART":
      return { ...state, roomsCountInCart: action.payload };
    case "GET_CART":
        return {...state, cart: action.payload}  ;
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const getRooms = async () => {
    try {
      let filter = window.location.search;
      const response = await axios(`${API}${filter}`);
      let action = {
        type: "GET_ROOMS",
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
  
  const addAndDelInCart = (room) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);

    if (!cart) {
      cart = {
        rooms: [],
        totalPrice: 0,
      };
    }
    let product = {
      room: room,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.rooms.filter((i) => {
      return i.room.id === room.id;
    });
    if (checkArr.length === 0) {
      cart.rooms.push(product);
    } else {
      cart.rooms = cart.rooms.filter((i) => {
        return i.room.id !== room.id;
      });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DEL_IN_CART",
      payload: cart.rooms.length,
    };
    dispatch(action);
  };
  const updateBadgeLenght = () => {
    let cart = localStorage.getItem('cart')
    let count = cart ? JSON.parse(cart).rooms.lenght : 0;
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
              rooms: [],
              totalPrice: 0,
          }
      }
      let checkArr = cart.rooms.filter((i)=>{
          return i.room.id === id
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
          rooms: [],
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
      cart.rooms = cart.rooms.map(i=>{
          if(i.room.id === id){
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
  const [postPerPage] = useState(4)
  useEffect(()=>{
    if(state.rooms){
      const data = state.rooms
      setPost(data)
    }

  }, [state.rooms])
  const numberOfLastPost = currentPage * postPerPage
  const numberOfFirstPost = numberOfLastPost - postPerPage
  const currentPost = post.slice(numberOfFirstPost, numberOfLastPost)
  const totalPosts = post.length
  // console.log(totalPosts, postPerPage)
  const handlePage = (newPage)=>{
    setCurrentPage(newPage)
  }
  function resetCurrentPage(){
    setCurrentPage(1)
  }

  return (

    <userContext.Provider
      value={{
        getRooms,
        getDetails,
        addAndDelInCart,
        checkInCart,
        getCart,
        changeCountInCart,
        handlePage,
        updateBadgeLenght,
        rooms: state.rooms,
        roomDetails: state.roomDetails,
        roomsCountInCart: state.roomsCountInCart,
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
