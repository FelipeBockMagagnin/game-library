import { Text, StyleSheet } from "react-native";
import colors from '../styles/Colors';

export default function PrimaryTitle({ style, children }) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.yellow,
  },
});