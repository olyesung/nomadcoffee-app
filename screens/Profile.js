import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";

const Stack = createStackNavigator();

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
