import { Text, View, StyleSheet, Image } from "react-native";
import colors from '../styles/Colors';
import { useState, useEffect } from "react";
import AuthContext from "../contexts/auth";
import { useContext } from "react";
import globalStyles from '../styles/GlobalStyles'

export default function ProfileScreen({ navigation }) {

  const { signOut, user } = useContext(AuthContext);


  useEffect(() => {

  }, [])

  return (
    <View style={globalStyles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{uri: user.google_data.picture}} style={styles.profileImage}/>

        <View>
          <Text style={[globalStyles.title, {textAlign: 'center'}]}>{user.google_data.name}</Text>

          <View style={[globalStyles.flex, {justifyContent: 'space-around'}]}>
            <View>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>0</Text>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>Games</Text>
            </View>

            <View>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>0</Text>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>Completed</Text>
            </View>

            <View>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>0</Text>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>Playing</Text>
            </View>

            <View>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>0</Text>
              <Text style={[globalStyles.text, {marginRight: 10, textAlign: 'center'}]}>Want</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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
  }
});