import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../helpers/API';

export const userContext = createContext()
const INIT_STATE = {
    cars: null,
    carDetails: null,
}

const reducer = (state=INIT_STATE, action)=>{
    switch(action.type){
        case "GET_CARS":
            return {...state, cars: action.payload}
        case "GET_DETAILS":
            return {...state, carDetails: action.payload}    
        default: 
        return state
    }
}


const UserContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const getCars = async()=>{
        try {
            let filter = window.location.search
            const response = await axios(`${API}${filter}`)
            let action = {
                type: "GET_CARS",
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e);
        }
    }

    const getDetails = async(id)=>{
        try {
            const response = await axios(`${API}/${id}`)
            let action ={
                type: "GET_DETAILS",
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e);
        }
    }
    
    
    return (
        <userContext.Provider value={{
            getCars,
            getDetails,
            cars: state.cars,
            carDetails: state.carDetails,
        }}>
           {props.children} 
        </userContext.Provider>
    );
};

export default UserContextProvider;