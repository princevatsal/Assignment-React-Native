import React, { useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import CreateTask from "../screens/CreateTask";
import { fetchTasks } from "../api/utility";
import { UserContext } from "../context/userContext";
import { taskType } from "../types/state";
import { HomeStackParamList } from "../types/otherTypes";

const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const { userToken, setTasks } = useContext(UserContext);

  useEffect(() => {
    userToken &&
      fetchTasks(userToken).then((taskList: taskType[]) => {
        taskList && setTasks(taskList);
      });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
    </Stack.Navigator>
  );
};

export default HomeStack;
