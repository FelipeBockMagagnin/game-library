import { Button, Text, View } from "react-native";

import AuthContext from "../contexts/auth";
import { useContext } from "react";

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
        <Text>Profile</Text>
        <Button title="log out" onPress={signOut}></Button>
    </View>
  );
}