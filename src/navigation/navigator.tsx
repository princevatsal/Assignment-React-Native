import React, { useContext, useEffect } from "react";
import HomeStack from "./homeStack";
import LoginStack from "./loginStack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navigator = () => {
  const Stack = createNativeStackNavigator();
  const {
    user,
    updateUser,
    updateUserToken,
    updateTasks,
    updateCompletedTasks,
  } = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem("user").then((data) => {
      if (data) {
        const dataobj = JSON.parse(data);
        dataobj && updateUser(dataobj);
      }
    });

    AsyncStorage.getItem("userToken").then((data) => {
      if (data) {
        const dataobj = JSON.parse(data);
        dataobj && updateUserToken(dataobj);
      }
    });
    AsyncStorage.getItem("tasks").then((data) => {
      if (data) {
        const dataobj = JSON.parse(data);
        dataobj && updateTasks(dataobj);
      }
    });
    AsyncStorage.getItem("completedTasks").then((data) => {
      if (data) {
        const dataobj = JSON.parse(data);
        dataobj && updateCompletedTasks(dataobj);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user && user.name ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={LoginStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
