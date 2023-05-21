import { TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from '../styles/Colors';
import { getImgUrl } from '../services/igdb'

export default function GameCard({id, url, game}) {
  return (
    <TouchableOpacity key={id} onPress={() => navigation.navigate('Game', { id: game.id, name: game.name })} >
    {url
      ? <Image
        source={{ uri: getImgUrl('t_cover_big', game.cover.image_id) }}
        style={styles.imageCover}
      />
      : ''}
  </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  imageCover: {
    width: 132,
    height: 187,
    borderRadius: 10,
    marginRight: 10,
    elevation: 5,
  },
});