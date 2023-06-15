import { Text, View, StyleSheet, ScrollView } from "react-native";
import colors from '../styles/Colors';
import { useEffect, useState } from "react";
import { get } from '../services/igdb'
import Loading from "../components/Loading";
import GameCard from "../components/GameCard";
import { PrimaryTitle } from "../components/Text";

export default function Home({ navigation }) {
  const [games, setGames] = useState([])
  const [recentGames, setRecentGames] = useState([])
  const [upcomingGames, setUpcomingGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get (
      "games", 
      "cover.url, cover.image_id,name,rating,rating_count, hypes", 
      "rating_count > 1000", 
      "rating_count desc", 
      "50"
    ).then(x => {
      setGames(x.data)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data)
    })

    const dateNow = new Date()

    //recent
    get(
      'games', 
      "cover.url, cover.image_id,name,rating,rating_count, hypes",
      "first_release_date != null & first_release_date < " + (parseInt(dateNow.getTime() / 1000)),
      "first_release_date desc",
      "50",
    ).then(x => {
      setRecentGames(x.data)
    }).catch(err => {
      console.log(err.response.data)
    })

    //upcoming
    get(
      "games", 
      "cover.url, cover.image_id,name,rating,rating_count, hypes",
      "first_release_date != null & first_release_date > " + (parseInt(dateNow.getTime() / 1000)),
      "first_release_date asc",
      "50",
    ).then(x => {
      setUpcomingGames(x.data)
    }).catch(err => {
      console.log(err.response.data)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <PrimaryTitle>Popular</PrimaryTitle>

        <ScrollView horizontal={true} >
          {games.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} />)}
        </ScrollView>

        <PrimaryTitle style={styles.mt20}>Recent</PrimaryTitle>

        <ScrollView horizontal={true} >
          {recentGames.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} />)}
        </ScrollView>


        <PrimaryTitle style={styles.mt20}>Upcoming</PrimaryTitle>

        <ScrollView horizontal={true} >
          {upcomingGames.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} />)}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  mt20: {
    marginTop: 20
  },
  gameList: {
    display: 'flex',
    flexDirection: 'row',
  }
});