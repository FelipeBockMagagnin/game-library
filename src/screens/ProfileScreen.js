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
import { PrimaryTitle, TextWhite } from "../components/Text";


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

      if (gamesPlaying.length > 0) {
        const gamesIdString = '(' + (gamesPlaying.length > 0 ? gamesPlaying.join(',') : gamesPlaying) + ')';
        get(
          'games',
          "cover.url, cover.image_id,name,rating,rating_count, hypes",
          "id = " + gamesIdString,
          "rating_count desc",
          "500",
        ).then(x => {
          setGamesPlayingData(x.data)
        }).catch(err => {
          console.log(err.response.data)
        })
      }

      if (gamesCompleted.length > 0) {
        const gamesCompletedIdString = '(' + (gamesCompleted.length > 0 ? gamesCompleted.join(',') : gamesCompleted) + ')';
        get(
          'games',
          "cover.url, cover.image_id,name,rating,rating_count, hypes",
          "id = " + gamesCompletedIdString,
          "rating_count desc",
          "500",
        ).then(x => {
          setGamesCompletedData(x.data)
        }).catch(err => {
          console.log(err.response.data)
        })
      }

      if (gamesWant.length > 0) {
        const gamesWantIdString = '(' + (gamesWant.length > 0 ? gamesWant.join(',') : gamesWant) + ')';
        get(
          'games',
          "cover.url, cover.image_id,name,rating,rating_count, hypes",
          "id = " + gamesWantIdString + ";",
          "rating_count desc",
          "500"
        ).then(x => {
          setGamesWantData(x.data)
        }).catch(err => {
          console.log(err.response.data)
        })
      }

    }).catch(err => {
      console.log('error in api', JSON.stringify(err))
    })

  }, [isFocused])

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: user.google_data.picture }} style={styles.profileImage} />

        <View>
          <PrimaryTitle style={{ textAlign: 'center' }}>{user.google_data.name}</PrimaryTitle>

          <View style={[globalStyles.flex, { justifyContent: 'space-around' }]}>
            <View>
              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                {gamesPlayingData.length + gamesCompletedData.length + gamesWantData.length}
              </TextWhite>

              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                Games
              </TextWhite>
            </View>

            <View>
              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                {gamesCompletedData.length}
              </TextWhite>

              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                Completed
              </TextWhite>
            </View>

            <View>
              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                {gamesPlayingData.length}
              </TextWhite>

              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                Playing
              </TextWhite>
            </View>

            <View>
              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                {gamesWantData.length}
              </TextWhite>

              <TextWhite style={{ marginRight: 10, textAlign: 'center' }}>
                Want
              </TextWhite>
            </View>
          </View>
        </View>
      </View>

      {
        gamesCompletedData.length > 0 ? (
          <>
            <PrimaryTitle style={styles.mt20}>Completed</PrimaryTitle>

            <ScrollView horizontal={true} >
              {gamesCompletedData.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} />)}
            </ScrollView>
          </>) : ''
      }

      {
        gamesPlayingData.length > 0 ? (
          <>
            <PrimaryTitle style={styles.mt20}>Playing</PrimaryTitle>

            <ScrollView horizontal={true} >
              {gamesPlayingData.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} />)}
            </ScrollView>
          </>) : ''
      }

      {
        gamesWantData.length > 0 ? (
          <>
            <PrimaryTitle style={styles.mt20}>Wanted</PrimaryTitle>

            <ScrollView horizontal={true} >
              {gamesWantData.map(game => <GameCard url={game?.cover?.url} id={game.id} game={game} />)}
            </ScrollView>
          </>) : ''
      }

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
  gameList: {
    display: 'flex',
    flexDirection: 'row',
  }
});