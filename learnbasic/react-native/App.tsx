import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perry nek</Text>
      <View style={styles.detail}>
        <Text style={styles.title}>Perry Hello world</Text>
        <Text style={styles.text}>I'm a barbie girl in a barbie world </Text>
      </View>
    </View>
  );
}

//css in js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 60,
    fontWeight: "bold",
    color: "red"
  },
  detail:{
    fontSize: 20,
    color: "blue",
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    color: "violet",
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  text: {
    color: "blue",
    fontSize: 15,
  }

});
