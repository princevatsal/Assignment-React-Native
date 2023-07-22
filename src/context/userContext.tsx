import React, { createContext, useReducer } from "react";

import {
  setUSER,
  setUSERTOKEN,
  setTASKS,
  updateUSER,
  updateUSERTOKEN,
  updateTASKS,
  addCOMTASK,
  updateCOMTASKS,
} from "./types";
import { userReducer } from "./reducers";
import { initialStateType } from "../types/state";

export const UserContext = createContext();

const initialState: initialStateType = {
  user: null,
  userToken: null,
  tasks: [],
  completedTasks: [],
};

// Global User Provider
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: setUSER, payload: user });
  };
  const setTasks = (tasks) => {
    dispatch({ type: setTASKS, payload: tasks });
  };
  const setUserToken = (token) => {
    dispatch({ type: setUSERTOKEN, payload: token });
  };
  const updateUser = (user) => {
    dispatch({ type: updateUSER, payload: user });
  };
  const updateTasks = (tasks) => {
    dispatch({ type: updateTASKS, payload: tasks });
  };
  const updateCompletedTasks = (tasks) => {
    dispatch({ type: updateCOMTASKS, payload: tasks });
  };
  const updateUserToken = (token) => {
    dispatch({ type: updateUSERTOKEN, payload: token });
  };

  const addCompletedTask = (task) => {
    dispatch({ type: addCOMTASK, payload: task });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userToken: state.userToken,
        tasks: state.tasks,
        completedTasks: state.completedTasks,
        setUser,
        setUserToken,
        setTasks,
        updateUser,
        updateUserToken,
        updateTasks,
        addCompletedTask,
        updateCompletedTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
