import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from "react-native";
import colors from '../styles/Colors';
import { useState, useEffect } from "react";
import { getToken, get, getImgUrl } from '../services/igdb'
import Loading from "../components/Loading";
import { FontAwesome5 } from '@expo/vector-icons';
import AuthContext from "../contexts/auth";
import { useContext } from "react";
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';

export default function GameScreen({ route, navigation }) {
  const { name, id } = route.params;

  const { user } = useContext(AuthContext);
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [gameCurrentStatus, setGameCurrentStatus] = useState(null)

  useEffect(() => {
    getToken().then(data => {
      get(data.data.access_token, 'games', "fields *, screenshots.image_id, platforms.name, genres.name; where id = " + id + ';').then(x => {
        setGame(x.data[0]);
        console.log(x.data[0]);
      }).catch(err => {
        console.log(err.response.data)
      }).finally(() => {
        setLoading(false)
      })
    }).catch(err => {
      console.log('err', err)
    }).finally(_ => {
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="angle-left" size={24} color={colors.yellow} />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <GameContent />
      </View>

    </ScrollView>
  );

  function addGame(status) {
    const data = {
      "game_id": id,
      "user_id": user.database_data.id,
      "current_status": status
    }

    axios.post(REACT_APP_API_URL + 'games', data).then(x => {
      console.log(x.data)
      let gameTextStatus = "";
      switch (status) {
        case 0:
          gameTextStatus = "Completed"
          break;
        case 1:
          gameTextStatus = "Playing"
          break;
        case 2:
          gameTextStatus = "Wanted"
          break;
      }

      setGameCurrentStatus(gameTextStatus);
    }).catch(err => {
      alert(err.response.data)
      console.log('error', JSON.stringify(err.response.data))
    })
  }

  function GameContent() {
    if (loading) {
      return <Loading />
    }

    console.log(game?.first_release_date);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(game?.first_release_date * 1000);

    return (
      <View>
        <View style={styles.mt10}>
          <ScrollView horizontal={true}>
            {game.screenshots?.map((screenshot, index) => {
              return <Image
                key={index}
                source={{ uri: getImgUrl('t_screenshot_med', screenshot.image_id) }}
                style={styles.imageCover}
              />
            })}
          </ScrollView>
        </View>


        <View style={[styles.flex, styles.mt10]}>
          <FontAwesome5 name="calendar-alt" size={20} color={colors.red} style={{ marginRight: 10 }} />
          <Text style={styles.text}>{months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}</Text>
        </View>

        <Text style={[styles.subtitle, styles.mt10]}>
          Genres
        </Text>
        <View style={styles.flex}>
          <ScrollView horizontal={true}>
            {game.genres?.map((genre, index) => {
              return <View key={index} style={styles.tag}>
                <Text style={styles.text}>
                  {genre.name}
                </Text>
              </View>
            })}
          </ScrollView>
        </View>

        <Text style={[styles.subtitle, styles.mt10]}>
          Platforms
        </Text>
        <View style={styles.flex}>
          <ScrollView horizontal={true}>
            {game.platforms?.map((plataform, index) => {
              return <View key={index} style={styles.tag}>
                <Text style={styles.text}>
                  {plataform.name}
                </Text>
              </View>
            })}
          </ScrollView>
        </View>

        <Text style={[styles.subtitle, styles.mt10]}>
          Summary
        </Text>
        <Text style={[styles.text]}>
          {game.summary}
        </Text>

        {gameCurrentStatus == null ? <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <Button title="Game Completed" onPress={() => addGame(0)} />
          <Button title="Game Played" onPress={() => addGame(1)} />
          <Button title="Game Wanted" onPress={() => addGame(2)} />
        </View> : <View>
          <Text style={styles.text}>Game {gameCurrentStatus}</Text>
          <Button title="Remove Game" onPress={() => removeGame()} />
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  tag: {
    borderColor: colors.red,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    margin: 2,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    fontSize: 15,
    color: '#ddd',
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.yellow,
    marginLeft: 20,
    marginTop: -4
  },
  typing: {
    fontSize: 18,
    color: colors.yellow,
    fontWeight: "500",
  },
  imageCover: {
    width: 284.5,
    height: 160,
    borderRadius: 10,
    marginRight: 10,
    elevation: 5,
  },
  mt10: {
    marginTop: 10
  }
});