import Axios from "react-native-axios";
import { fetchTasksResponse, updateTaskBody } from "../types/apiTypes";
import { taskType } from "../types/state";
import { baseUrl, baseHeader } from "./resources";

const fetchTasks = (userToken: string): Promise<taskType[]> => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "get",
      url: baseUrl + "task?phone=%2B919479789211",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response: fetchTasksResponse) =>
        resolve(response.data?.data?.task)
      )
      .catch(() => reject());
  });
};

const completeTask = (taskId: string, userToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const data: updateTaskBody = {
      phone: "+919479789211",
      uniquelink: taskId,
      status: "completed",
    };
    Axios({
      method: "put",
      url: baseUrl + "task",
      headers: {
        Authorization: "Bearer " + userToken,
        ...baseHeader,
      },
      data: JSON.stringify(data),
    })
      .then(() => resolve())
      .catch(() => reject());
  });
};

const createTask = (task: taskType, userToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const data: taskType = {
      ...task,
      phone: "+919479789211",
    };
    console.log(data, userToken);
    Axios({
      method: "post",
      url: baseUrl + "task",
      headers: {
        ...baseHeader,
        Authorization: "Bearer " + userToken,
      },
      data: JSON.stringify(data),
    })
      .then(() => {
        console.log("done");
        resolve();
      })
      .catch((e) => {
        console.log(e, "ee");
        reject();
      });
  });
};
export { fetchTasks, completeTask, createTask };
