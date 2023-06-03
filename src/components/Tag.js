import { StyleSheet, View } from "react-native";
import { TextWhite } from "./Text";
import colors from '../styles/Colors';

function TagSecondary({ children }) {
    return (
        <View style={styles.tag}>
            <TextWhite>{children}</TextWhite>
        </View>
    )
}

export { TagSecondary }

const styles = StyleSheet.create({
    tag: {
        borderColor: colors.red,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        margin: 2,
        paddingHorizontal: 5,
        paddingVertical: 2
    },
});