import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";

export default function LoggedInProfile() {
  return (
    <View>
      <Text>Logged In</Text>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
