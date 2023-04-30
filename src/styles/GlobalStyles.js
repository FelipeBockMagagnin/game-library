import { StyleSheet } from 'react-native';
import colors from './Colors';

export default StyleSheet.create({
  container: {
    margin: 10
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
  },
  mt10: {
    marginTop: 10
  },
});