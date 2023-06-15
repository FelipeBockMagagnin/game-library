import { Text, View, StyleSheet, ScrollView } from "react-native";
import colors from '../styles/Colors';
import { useEffect, useState } from "react";
import { get } from '../services/igdb'
import Loading from "../components/Loading";
import GameCard from "../components/GameCard";

export default function Discover({ navigation }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get(
      'games', 
      "cover.url, cover.image_id,name,rating,rating_count, hypes",
      "rating_count > 1000",
      "rating_count desc",
      "10",
    ).then(x => {
      //console.log(x.data);

      setGames(x.data)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 10 games of all time</Text>

      <ScrollView horizontal={true} >
        {games.map(game => <GameCard url={game?.cover?.url} key={game.id} id={game.id} game={game} />)}
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