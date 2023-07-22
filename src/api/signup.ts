import Axios from "react-native-axios";

import {
  sendOtpResponse,
  otpVerifyBody,
  verifyOtpObj,
  verifyOtpResponse,
  createUserBody,
} from "../types/apiTypes";

import { baseUrl, baseHeader } from "./resources";

const submitNumber = (number: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    Axios.get(baseUrl + "verification?phone=%2B" + number + "&signature=xyz")
      .then((response: sendOtpResponse) => {
        if (response.data.code == 200) resolve();
        else reject();
      })
      .catch(() => reject());
  });
};

const verifyOtp = (otp: number): Promise<verifyOtpObj> => {
  return new Promise((resolve, reject) => {
    const data: otpVerifyBody = {
      phone: "+919479789211",
      code: otp,
    };

    Axios({
      method: "post",
      url: baseUrl + "verification",
      headers: baseHeader,
      data: JSON.stringify(data),
    })
      .then((response: verifyOtpResponse) => {
        resolve(response.data);
      })
      .catch(() => reject());
  });
};

const createUser = (token: string, name: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const data: createUserBody = {
      phone: "+919479789211",
      name: name,
    };

    Axios({
      method: "post",
      url: baseUrl + "user",
      headers: {
        Authorization: "Bearer " + token,
        ...baseHeader,
      },
      data: JSON.stringify(data),
    })
      .then(() => resolve())
      .catch(() => reject());
  });
};
export { submitNumber, verifyOtp, createUser };
