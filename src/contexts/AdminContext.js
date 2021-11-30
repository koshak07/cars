import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../helpers/API";

export const adminContext = React.createContext();

const INIT_STATE = {
  rooms: null,
  roomToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_ROOMS":
      return { ...state, rooms: action.payload };
    case "GET_ROOM_TO_EDIT":
      return { ...state, roomToEdit: action.payload };
    case "CLEAR_STATE":
      return { ...state, roomToEdit: action.payload };
    default:
      return state;
  }
};

const AdminContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //greate product
  const addRoom = async (room) => {
    try {
      const response = await axios.post(API, room);
      getRooms();
    } catch (e) {
      console.log(e);
    }
  };
  //get room
  const getRooms = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_ROOMS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  //update
  const getRoomToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_ROOM_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  //save updated data on id

  const saveEditedRoom = async (editedRoom) => {
    try {
      const response = await axios.patch(`${API}/${editedRoom.id}`, editedRoom);
      getRooms();
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

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`${API}/${id}`);
      getRooms();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <adminContext.Provider
      value={{
        addRoom,
        getRooms,
        clearState,
        saveEditedRoom,
        getRoomToEdit,
        deleteRoom,
        rooms: state.rooms,
        roomToEdit: state.roomToEdit,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminContextProvider;
