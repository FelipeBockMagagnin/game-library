import { Text, View, StyleSheet, ScrollView  } from "react-native";
import colors from '../styles/Colors';
import { useEffect, useState } from "react";
import { getToken, get } from '../services/igdb'
import Loading from "../components/Loading";
import GameCard from "../components/GameCard";

export default function Discover({navigation}) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getToken().then(data => {
      get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 50;where rating_count > 1000;").then(x => {
        //console.log(x.data);

        setGames(x.data)
        setLoading(false)
      }).catch(err => {
        console.log(err.response.data)
      })
    }).catch(err => {
      console.log('err', err)
    })
  }, [])

  if(loading){
    return <Loading/>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>

      <ScrollView horizontal={true} >
        {games.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} /> )}
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
  gameList: {
    display: 'flex',
    flexDirection: 'row',
  }
});