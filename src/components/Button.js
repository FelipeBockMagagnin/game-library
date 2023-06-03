import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from '../styles/Colors';

function PrimaryButton({ onPress, title, description }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.buttonText}>
                {title}
            </Text>
            <Text style={{ textAlign: "center", color: colors.dark_green }}>
                {description}
            </Text>
        </TouchableOpacity>
    )
}

export { PrimaryButton }

const styles = StyleSheet.create({
    buttonText: {
        color: colors.dark_green,
        fontWeight: "700",
        fontSize: 20,
        textAlign: "center"
    },
    button: {
        width: '100%',
        backgroundColor: colors.yellow,
        borderRadius: 20,
        padding: 10,
        color: '#FFF',
        marginTop: 10
    },
});