import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import colors from '../styles/Colors';
import { useState, useEffect } from "react";
import AuthContext from "../contexts/auth";
import { useContext } from "react";
import globalStyles from '../styles/GlobalStyles'
import { REACT_APP_API_URL } from '../../env';
import axios from 'axios';
import { getToken, get } from '../services/igdb'
import { useIsFocused } from '@react-navigation/native';
import GameCard from "../components/GameCard";


export default function ProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();
  
  const [gamesPlayingData, setGamesPlayingData] = useState([])
  const [gamesCompletedData, setGamesCompletedData] = useState([])
  const [gamesWantData, setGamesWantData] = useState([])

  useEffect(() => {
    if (!user) return;

    axios.get(REACT_APP_API_URL + 'games/' + user.database_data.id).then(x => {
      let gamesCompleted = [], gamesPlaying = [], gamesWant = [];

      x.data.forEach(item => {
        if (item.current_status == 0) {
          gamesCompleted.push(item.game_id)
        }

        if (item.current_status == 1) {
          gamesPlaying.push(item.game_id)
        }

        if (item.current_status == 2) {
          gamesWant.push(item.game_id)
        }
      });

      getToken().then(data => {
        if (gamesPlaying.length > 0) {
          const gamesIdString = '(' + (gamesPlaying.length > 0 ? gamesPlaying.join(',') : gamesPlaying) + ')';
          get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 500;where id = " + gamesIdString + ";").then(x => {
            setGamesPlayingData(x.data)
          }).catch(err => {
            console.log(err.response.data)
          })
        }

        if (gamesCompleted.length > 0) {
          const gamesCompletedIdString = '(' + (gamesCompleted.length > 0 ? gamesCompleted.join(',') : gamesCompleted) + ')';
          get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 500;where id = " + gamesCompletedIdString + ";").then(x => {
            setGamesCompletedData(x.data)
          }).catch(err => {
            console.log(err.response.data)
          })
        }

        if (gamesWant.length > 0) {
          const gamesWantIdString = '(' + (gamesWant.length > 0 ? gamesWant.join(',') : gamesWant) + ')';
          get(data.data.access_token, 'games', "fields cover.url, cover.image_id,name,rating,rating_count, hypes;sort rating_count desc;limit 500;where id = " + gamesWantIdString + ";").then(x => {
            setGamesWantData(x.data)
          }).catch(err => {
            console.log(err.response.data)
          })
        }
      }).catch(err => {
        console.log('err', err)
      })

    }).catch(err => {
      console.log('error in api', JSON.stringify(err))
    })

  }, [isFocused])

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: user.google_data.picture }} style={styles.profileImage} />

        <View>
          <Text style={[globalStyles.title, { textAlign: 'center' }]}>{user.google_data.name}</Text>

          <View style={[globalStyles.flex, { justifyContent: 'space-around' }]}>
            <View>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>{gamesPlayingData.length + gamesCompletedData.length + gamesWantData.length}</Text>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>Games</Text>
            </View>

            <View>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>{gamesCompletedData.length}</Text>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>Completed</Text>
            </View>

            <View>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>{gamesPlayingData.length}</Text>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>Playing</Text>
            </View>

            <View>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>{gamesWantData.length}</Text>
              <Text style={[globalStyles.text, { marginRight: 10, textAlign: 'center' }]}>Want</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={[styles.title, styles.mt20]}>Completed</Text>

      <ScrollView horizontal={true} >
        {gamesCompletedData.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} /> )}
      </ScrollView>

      <Text style={[styles.title, styles.mt20]}>Playing</Text>

      <ScrollView horizontal={true} >
        {gamesPlayingData.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} /> )}
      </ScrollView>


      <Text style={[styles.title, styles.mt20]}>Wanted</Text>

      <ScrollView horizontal={true} >
        {gamesWantData.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} /> )}
      </ScrollView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 70,
  },
  profileImageContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
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
  gameList: {
    display: 'flex',
    flexDirection: 'row',
  }
});