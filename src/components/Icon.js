import { TouchableOpacity } from "react-native";
import colors from '../styles/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

function PrimaryIcon({ name, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesome5 name={name} size={24} color={colors.yellow} />
        </TouchableOpacity>
    );
}

function SecondaryIcon({ name, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesome5 name={name} size={20} color={colors.red} />
        </TouchableOpacity>
    );
}

export { PrimaryIcon, SecondaryIcon }