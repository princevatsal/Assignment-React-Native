import { taskType } from "./state";
type sendOtpResponse = {
  data: {
    code: number;
    data: {
      status: string;
    };
    message: string;
  };
};
type otpVerifyBody = {
  phone: string;
  code: number;
};
type verifyOtpObj = {
  data: {
    token: string;
  };
};

type verifyOtpResponse = {
  data: verifyOtpObj;
};
type createUserBody = {
  phone: string;
  name: string;
};

type baseHeaderType = {
  "Content-Type": string;
};
type fetchTasksResponse = {
  data: { data: { task: taskType[] } };
};
type updateTaskBody = {
  phone: string;
  uniquelink: string;
  status: string;
};

export {
  sendOtpResponse,
  otpVerifyBody,
  verifyOtpObj,
  verifyOtpResponse,
  createUserBody,
  baseHeaderType,
  fetchTasksResponse,
  updateTaskBody,
};
