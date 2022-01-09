import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Navigators from "./Navigators";
import CreateShopNav from "./CreateShopNav";
import UploadForm from "../../screens/UploadForm";

const Stack = createStackNavigator();

export default function RootNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="Navigators" component={Navigators} />
      <Stack.Screen name="CreateShopNav" component={CreateShopNav} />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
