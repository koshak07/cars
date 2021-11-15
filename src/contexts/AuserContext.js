import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../helpers/API";

export const auserContext = React.createContext();

const INIT_STATE = {
  cars: null,
  carToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
      case "GET_CARS":
          return {...state, cars: action.payload};
      case 'GET_CAR_TO_EDIT':
        return {...state, carToEdit: action.payload}
      case "CLEAR_STATE":
        return  {...state, carToEdit: action.payload}
    default:
      return state;
  }
};



const AuserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
//greate product
  const addCar = async (car) =>{
      try {
          const response = await axios.post(API, car)
          getCars()
      } catch (e) {
          console.log(e);
      }
  }
  //get product
const getCars = async ()=>{
    try {
        const response = await axios(API)
        let action = {
            type: "GET_CARS",
            payload: response.data
        }
        dispatch(action)
        // console.log(action);
    } catch (e) {
        console.log(e);
    }
}
//update
const getCarToEdit = async (id)=>{
  try {
    const response = await axios(`${API}/${id}`)
    let action = {
      type: 'GET_CAR_TO_EDIT',
      payload: response.data,
    }
    dispatch(action)
  } catch (e) {
    console.log(e);
  }
}

//save updated data on id

const saveEditedCar = async (editedCar)=>{
  try {
    const response = await axios.patch(`${API}/${editedCar.id}`, editedCar)
    getCars()
  } catch (e) {
    console.log(e);
  }
}

const clearState = ()=>{
  let action = {
    type: "CLEAR_STATE",
    payload: null,
  }
  dispatch(action)
}




  return (
  <auserContext.Provider
  value={{
      addCar:addCar,
      getCars,
      clearState,
      saveEditedCar,
      getCarToEdit,
      cars: state.cars,
      carToEdit: state.carToEdit,
  }}
  >
      {props.children}
 </auserContext.Provider>)
};

export default AuserContextProvider;
