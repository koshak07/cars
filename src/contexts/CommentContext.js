import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API, COMMENT_API } from "../helpers/API";

export const commentContext = createContext();

const INIT_STATE = {
  allComments: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return { ...state, allComments: action.payload };
    default:
      return state;
  }
};

const CommentContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // ! добавить комментарии

  const addComment = async (newComment) => {
    try {
      let response = await axios.post(COMMENT_API, newComment);
      getComments();
    } catch (e) {
      console.log(e);
    }
  };

  //  ! read

  const getComments = async () => {
    try {
      let response = await axios(COMMENT_API);
      let action = {
        type: "GET_COMMENTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async (id) => {
    try {
      let response = await axios.delete(`${COMMENT_API}/${id}`);
      getComments();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <commentContext.Provider
      value={{
        addComment: addComment,
        getComments: getComments,
        deleteComment: deleteComment,
        allComments: state.allComments,
      }}
    >
      {props.children}
    </commentContext.Provider>
  );
};

export default CommentContextProvider;
