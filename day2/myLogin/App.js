import React from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from "./styles";

const validUsers = {
  user1: "123456",
  user2: "123456"
};


const App = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    if (validUsers[username] && validUsers[username] === password) {
      setIsLoggedIn(true);
    }
    setError(true);
  }

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome {username} !</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput

        style={[styles.input, error && styles.inputError]}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setError(false);
        }}
      />

      <Text style = {styles.label}>Password</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(false);
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Confirm and Continue</Text>
      </TouchableOpacity>
    </View>
  )
};


export default App;