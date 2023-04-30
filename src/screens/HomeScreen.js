import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import colors from '../styles/Colors';
import { useEffect, useState } from "react";
import { getToken, get, getImgUrl } from '../services/igdb'
import Loading from "../components/Loading";

export default function Home({ navigation }) {
  const [games, setGames] = useState([])
  const [recentGames, setRecentGames] = useState([])
  const [upcomingGames, setUpcomingGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getToken().then(data => {
      get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 50;where rating_count > 1000;").then(x => {
        setGames(x.data)
        setLoading(false)
      }).catch(err => {
        console.log(err.response.data)
      })

      const dateNow = new Date()

      //recent
      get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 50;sort first_release_date desc; where first_release_date != null & first_release_date < " + (parseInt(dateNow.getTime() / 1000)) + ';').then(x => {
        setRecentGames(x.data)
      }).catch(err => {
        console.log(err.response.data)
      })

      //upcoming
      get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 50;sort first_release_date asc; where first_release_date != null & first_release_date > " + (parseInt(dateNow.getTime() / 1000)) + ';').then(x => {
        setUpcomingGames(x.data)
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
      <ScrollView>
        <Text style={[styles.title]}>Popular</Text>

        <ScrollView horizontal={true} >
          {games.map(game => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Game', { id: game.id, name: game.name })} >
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

        <Text style={[styles.title, styles.mt20]}>Recent</Text>

        <ScrollView horizontal={true} >
          {recentGames.map(game => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Game', { id: game.id, name: game.name })} >
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

        <Text style={[styles.title, styles.mt20]}>Upcoming</Text>

        <ScrollView horizontal={true} >
          {upcomingGames.map(game => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Game', { id: game.id, name: game.name })} >
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