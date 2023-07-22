import { completeTask } from "../api/utility";

type taskType = {
  category: string;
  date_created?: string;
  details: string;
  expiry_date: string;
  name: string;
  phone: string;
  status?: string;
  uniquelink?: string;
};

type completeTaskType = {
  taskId: string;
  time: string;
};
type userType = null | {
  name: string;
  phoneNo: string;
};

type initialStateType = {
  user: userType;
  userToken: null | string;
  tasks: taskType[];
  completedTasks: completeTaskType[];
};
export { completeTask, initialStateType, taskType, userType };
