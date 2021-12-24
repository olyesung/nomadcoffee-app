import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";
import Profile from "./Profile";
import Home from "./Home";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import LoggedInProfile from "./LoggedInProfile";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function Navigators() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {(props) =>
          isLoggedIn ? <LoggedInProfile {...props} /> : <Profile {...props} />
        }
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
