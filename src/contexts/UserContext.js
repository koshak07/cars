import axios from 'axios';
import React, { createContext, useEffect, useReducer, useState } from 'react';
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
            // console.log(filter)
            console.log(response.data)
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

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    useEffect(() => {
      if (state.cars) {
        const data = state.cars;
        setPosts(data);
      }
    }, [state.cars]);

     const numberOfLastPost = currentPage * postsPerPage;
     const numberOfFirstPost = numberOfLastPost - postsPerPage;
     const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost);
     const totalPosts = posts.length;
     const handlePage = (newPage) => {
       setCurrentPage(newPage);
     };
     function resetCurrentPage() {
       setCurrentPage(1);
     }

    
    
    return (
        <userContext.Provider value={{
            getCars,
            getDetails,
            handlePage,
            currentPosts,
            totalPosts,
            cars: state.cars,
            carDetails: state.carDetails,
        }}>
           {props.children} 
        </userContext.Provider>
    );
};

export default UserContextProvider;