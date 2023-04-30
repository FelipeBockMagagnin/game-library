import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity  } from "react-native";
import colors from '../styles/Colors';
import { useEffect, useState } from "react";
import { getToken, get, getImgUrl } from '../services/igdb'

export default function Discover({navigation}) {
  const [games, setGames] = useState([])

  useEffect(() => {
    getToken().then(data => {
      get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 50;where rating_count > 1000;").then(x => {
        //console.log(x.data);

        setGames(x.data);
      }).catch(err => {
        console.log(err.response.data)
      })
    }).catch(err => {
      console.log('err', err)
    })
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>

      <ScrollView horizontal={true} >
        {games.map(game => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Game', {id: game.id, name: game.name})} >
              {game?.cover?.url
              ? <Image
                source={{ uri: getImgUrl('t_cover_big', game.cover.image_id) }}
                style={styles.imageCover}
              />
              : ''}
            </TouchableOpacity >
            
          )
        })}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.yellow
  },
  imageCover: {
    width: 132,
    height: 187,
    borderRadius: 10,
    marginRight: 10,
    elevation: 5,
  },
  gameList: {
    display: 'flex',
    flexDirection: 'row',
  }
});