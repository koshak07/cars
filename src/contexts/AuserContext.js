import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../helpers/API";

export const auserContext = React.createContext();

const INIT_STATE = {
  cars: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
      case "GET_CARS":
          return {...state, cars: action.payload}
    default:
      return state;
  }
};



const AuserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
//создаем продукт
  const addCar = async (car) =>{
      try {
          const response = await axios.post(API, car)
      } catch (e) {
          console.log(e);
      }
  }
  //стгиваем продукт
const getCars = async ()=>{
    try {
        const response = await axios(API)
        let action = {
            type: "GET_CARS",
            payload: response.data
        }
        dispatch(action)
        console.log(action);
    } catch (e) {
        console.log(e);
    }
}

  return (
  <auserContext.Provider
  value={{
      addCar:addCar,
  }}
  >
      {props.children}
 </auserContext.Provider>)
};

export default AuserContextProvider;
