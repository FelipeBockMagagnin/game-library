import { Text, StyleSheet } from "react-native";
import colors from '../styles/Colors';

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

function PrimaryTitle({ style, children }) {
    return (
        <Text style={[styles.title, style]}>{children}</Text>
    );
}

export { TextWhite, TextSubtitle, PrimaryTitle }

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#ddd',
        fontWeight: "500",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.yellow,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: "500",
    },
});