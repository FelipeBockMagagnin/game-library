import { Text, View, StyleSheet } from "react-native";
import colors from '../styles/Colors';

export default function Home() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight:  "bold",
    color: colors.yellow
  },
  typing: {
    fontSize: 18,
    color: colors.yellow,
    fontWeight: "500",
  }
});