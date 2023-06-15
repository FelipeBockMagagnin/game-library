import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { get } from '../services/igdb'
import Loading from "../components/Loading";
import AuthContext from "../contexts/auth";
import { useContext } from "react";
import axios from 'axios';
import { REACT_APP_API_URL } from '../../env';
import { PrimaryButton } from "../components/Button";
import { PrimaryIcon, SecondaryIcon } from "../components/Icon";
import { TextSubtitle, TextWhite, PrimaryTitle } from "../components/Text";
import { ImageCover } from "../components/Image";
import { TagSecondary } from "../components/Tag";

export default function GameScreen({ route, navigation }) {
  const { name, id } = route.params;

  const { user } = useContext(AuthContext);
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [gameCurrentStatus, setGameCurrentStatus] = useState(null)

  useEffect(() => {
    axios.get(REACT_APP_API_URL + 'games/' + user.database_data.id + '/' + id).then(x => {
      if (x.data.length > 0) {
        setGameCurrentStatus(x.data[0].current_status);
      }
    }).catch(err => {
      console.log('error', JSON.stringify(err.response.data))
      alert(err)
    })

    get(
      'games',
      "*, screenshots.image_id, platforms.name, genres.name",
      "id = " + id
    ).then(x => {
      setGame(x.data[0]);
      console.log(x.data[0])

    }).catch(err => {
      console.log(err.response.data)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <PrimaryIcon name="angle-left" onPress={() => navigation.goBack()} />
        <PrimaryTitle style={{ marginLeft: 10, marginTop: -4 }}>{name}</PrimaryTitle>
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
      setGameCurrentStatus(status);
    }).catch(err => {
      console.log('error', JSON.stringify(err.response.data))
      alert(err.response.data)
    })
  }

  function removeGame() {
    const data = {
      "game_id": id,
      "user_id": user.database_data.id,
    }

    axios.post(REACT_APP_API_URL + 'games/delete', data).then(x => {
      setGameCurrentStatus(null);
    }).catch(err => {
      alert(err.response.data)
      console.log('error', JSON.stringify(err.response.data))
    })
  }

  function gameStatusText(status) {
    let gameTextStatus = "";

    switch (status) {
      case 0:
        gameTextStatus = "Completed"
        break;
      case 1:
        gameTextStatus = "Playing"
        break;
      case 2:
        gameTextStatus = "Want"
        break;
    }

    return gameTextStatus;
  }

  function GameContent() {
    if (loading) {
      return <Loading />
    }

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(game?.first_release_date * 1000);

    return (
      <View style={styles.pb50}>
        <View style={[styles.mt10]}>
          <ScrollView horizontal={true}>
            {game.screenshots?.map((screenshot, index) => {
              return <ImageCover key={'cover' + index} image_id={screenshot.image_id} />
            })}
          </ScrollView>
        </View>

        <View style={[styles.flex, styles.mt10]}>
          <SecondaryIcon name="calendar-alt" />
          <TextWhite>
            {months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()}
          </TextWhite>
        </View>

        {game.genres ?
          <>
            <TextSubtitle style={styles.mt10}>
              Genres
            </TextSubtitle>

            <View style={styles.flex}>
              <ScrollView horizontal={true}>
                {game.genres?.map((genre, index) => {
                  return <TagSecondary key={'genre' + index}>{genre.name}</TagSecondary>
                })}
              </ScrollView>
            </View>
          </> : ''}

        <TextSubtitle style={styles.mt10}>
          Platforms
        </TextSubtitle>
        <View style={styles.flex}>
          <ScrollView horizontal={true}>
            {game.platforms?.map((plataform, index) => {
              return <TagSecondary key={'platform' + index} >{plataform.name}</TagSecondary>
            })}
          </ScrollView>
        </View>

        <TextSubtitle style={styles.mt10}>
          Summary
        </TextSubtitle>

        <TextWhite>
          {game.summary}
        </TextWhite>

        {gameCurrentStatus == null ? <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: 20 }}>
          <PrimaryTitle style={{ textAlign: 'center' }}>Add to</PrimaryTitle>
          <PrimaryButton onPress={() => addGame(0)} title='Completed' description='Finished Games' />
          <PrimaryButton onPress={() => addGame(1)} title='Playing' description='Currently Playing' />
          <PrimaryButton onPress={() => addGame(2)} title='Want' description='Wanted games' />
        </View> : <View style={styles.mt20}>
          <PrimaryTitle style={{ textAlign: 'center' }}>Status: {gameStatusText(gameCurrentStatus)}</PrimaryTitle>
          <PrimaryButton onPress={() => removeGame()} title='Remove' description='Remove from your library' />
          <PrimaryButton onPress={() => removeGame()} title='Change Status' description='Update game status' />
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  pb50: {
    marginBottom: 50
  }
});