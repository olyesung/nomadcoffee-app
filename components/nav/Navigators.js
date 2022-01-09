import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../../screens/Search";
import Profile from "../../screens/Profile";
import Home from "../../screens/Home";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";
import LoggedInProfile from "../../screens/LoggedInProfile";
import TabIcon from "./TabIcon";
import CreateShop from "./CreateShopNav";

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
        name="Add"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      >
        {(props) =>
          isLoggedIn ? <CreateShop {...props} /> : <Profile {...props} />
        }
      </Tabs.Screen>
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
