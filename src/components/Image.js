import { StyleSheet, Image } from "react-native";
import { getImgUrl } from '../services/igdb'

function ImageCover({ image_id }) {
    return (
        <Image
            source={{ uri: getImgUrl('t_screenshot_med', image_id) }}
            style={styles.imageCover}
        />
    )
}

export { ImageCover }

const styles = StyleSheet.create({
    imageCover: {
        width: 284.5,
        height: 160,
        borderRadius: 10,
        marginRight: 10,
        elevation: 5,
    },
});