import { Text, StyleSheet } from "react-native";

function TextWhite({ children, style }) {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text>
    )
}

function TextSubtitle({ children, style }) {
    return (
        <Text style={[styles.subtitle, style]}>
            {children}
        </Text>
    )
}

export { TextWhite, TextSubtitle }

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#ddd',
        fontWeight: "500",
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: "500",
    },
});