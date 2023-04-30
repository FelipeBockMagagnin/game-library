import { View, ActivityIndicator } from "react-native";
import colors from '../styles/Colors';

export default function Loading() {
  return (
    <ActivityIndicator size="large" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], marginTop: 20 }} color={colors.yellow}/>
  );
}