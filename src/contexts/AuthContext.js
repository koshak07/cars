import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FireBase';

export const authContext = createContext()
const INIT_STATE = {
    user: null,

}
const reducer = (state= INIT_STATE, action)=>{
    switch(action.type){
        case "SET_USER":
            return {...state, user: action.payload}
        default:
            return state
    }
}
const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const googleProvider = new GoogleAuthProvider()
    const authWithGoogle = async ()=>{
        try {
            const response = await signInWithPopup(auth, googleProvider)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            let action = {
                type: "SET_USER",
                payload: user,

            }
            dispatch(action)
        })
    }, [])
    //logout
    const logOut = async()=>{
        try {
            await signOut(auth)
            localStorage.removeItem('email')
            
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <authContext.Provider value={{
            authWithGoogle,
            logOut,
            user: state.user,
        }}
        
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;