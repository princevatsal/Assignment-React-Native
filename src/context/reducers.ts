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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userType, taskType, initialStateType } from "../types/state";

const updateUser = (user: userType, state: initialStateType) => {
  return {
    ...state,
    user,
  };
};
const updateUserToken = (userToken: string, state: initialStateType) => {
  return {
    ...state,
    userToken,
  };
};
const updateTasks = (tasks: taskType[], state: initialStateType) => {
  return {
    ...state,
    tasks,
  };
};
const updateCompletedTasks = (tasks: taskType[], state: initialStateType) => {
  return {
    ...state,
    completedTasks: tasks,
  };
};

const setUser = (user: userType, state: initialStateType) => {
  AsyncStorage.setItem("user", JSON.stringify(user));
  return {
    ...state,
    user,
  };
};
const setUserToken = (userToken: string, state: initialStateType) => {
  AsyncStorage.setItem("userToken", JSON.stringify(userToken));
  return {
    ...state,
    userToken,
  };
};
const setTasks = (tasks: taskType[], state: initialStateType) => {
  AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  return {
    ...state,
    tasks,
  };
};
const addCompletedTask = (task: string, state: initialStateType) => {
  const newComTasks = [
    ...state.completedTasks,
    { taskId: task, time: Date.now() },
  ];
  AsyncStorage.setItem("completedTasks", JSON.stringify(newComTasks));
  return {
    ...state,
    completedTasks: newComTasks,
  };
};

export const userReducer = (
  state: initialStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case setUSER:
      return setUser(action.payload, state);
    case setUSERTOKEN:
      return setUserToken(action.payload, state);
    case setTASKS:
      return setTasks(action.payload, state);
    case updateUSER:
      return updateUser(action.payload, state);
    case updateUSERTOKEN:
      return updateUserToken(action.payload, state);
    case updateTASKS:
      return updateTasks(action.payload, state);
    case addCOMTASK:
      return addCompletedTask(action.payload, state);
    case updateCOMTASKS:
      return updateCompletedTasks(action.payload, state);
    default:
      return state;
  }
};
