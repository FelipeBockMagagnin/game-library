import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AuthContext from "../../src/contexts/auth";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TypeWriter from 'react-native-typewriter';
import colors from '../styles/Colors';
import GamingImage from '../../assets/gaming_undraw.png'

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [typingText, setTypingText] = useState("Manage");
  const [typingState, setTypingState] = useState(1)
  const [currentWord, setCurrentWord] = useState(0);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { signIn } = useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "123044315668-2bfg585k88vrhrcs86a8v2q3vlh3p8vj.apps.googleusercontent.com",
    iosClientId: "123044315668-9fb1cdo7qs8ockrhi8v6qs7n6ph3nldl.apps.googleusercontent.com",
    webClientId: "123044315668-c64lo3skfc25o3ivdv8k28hdag211jf6.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      signIn(user)
    } catch (error) {
      // Add your own error handler here
    }
  };

  function onTypingEndHandler() {
    let words = ["Manage!  ", "Share!  ", "Grow!  "] 

    if(typingState === 1) {
      setTypingState(-1);
      return;
    }

    if(typingState === -1) {
      setTypingState(1);
      setTypingText(words[currentWord]);
      if(currentWord == words.length) {
        setCurrentWord(0);
        return;
      }

      setCurrentWord(currentWord + 1)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={GamingImage}  style={ {
    width: '100%',
    height: 250,
    resizeMode: 'center'
  }}/>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={styles.title}>Game Library</Text>
        
        <TypeWriter 
          typing={typingState} 
          minDelay={100} 
          onTypingEnd={onTypingEndHandler} 
          style={styles.typing}
        >
          {typingText}
        </TypeWriter>
      </View>
      

      <FontAwesome.Button 
        name="google" 
        backgroundColor={colors.yellow} 
        color={colors.dark_green} 
        style={{  }} 
        onPress={() => {
          promptAsync();
        }}>
        Continue with Google
      </FontAwesome.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 36,
    fontWeight:  "bold",
    color: colors.yellow
  },
  typing: {
    fontSize: 18,
    color: colors.yellow,
    fontWeight: "500",
  }
});