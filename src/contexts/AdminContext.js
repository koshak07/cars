import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../helpers/API";

export const adminContext = React.createContext();

const INIT_STATE = {
  cars: null,
  carToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CARS":
      return { ...state, cars: action.payload };
    case "GET_CAR_TO_EDIT":
      return { ...state, carToEdit: action.payload };
    case "CLEAR_STATE":
      return { ...state, carToEdit: action.payload };
    default:
      return state;
  }
};

const AdminContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //greate product
  const addCar = async (car) => {
    try {
      const response = await axios.post(API, car);
      getCars();
    } catch (e) {
      console.log(e);
    }
  };
  //get product
  const getCars = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_CARS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  //update
  const getCarToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_CAR_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  //save updated data on id

  const saveEditedCar = async (editedCar) => {
    try {
      const response = await axios.patch(`${API}/${editedCar.id}`, editedCar);
      getCars();
    } catch (e) {
      console.log(e);
    }
  };

  const clearState = () => {
    let action = {
      type: "CLEAR_STATE",
      payload: null,
    };
    dispatch(action);
  };

  //delete

  const deleteCar = async (id) => {
    try {
      const response = await axios.delete(`${API}/${id}`);
      getCars();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <adminContext.Provider
      value={{
        addCar: addCar,
        getCars,
        clearState,
        saveEditedCar,
        getCarToEdit,
        deleteCar,
        cars: state.cars,
        carToEdit: state.carToEdit,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminContextProvider;
