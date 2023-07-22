import React from "react";
import Navigator from "./src/navigation/navigator";
import { UserProvider } from "./src/context/userContext";
export default function App() {
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}
