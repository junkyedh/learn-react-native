import React from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from "../styles/styles";

const validUsers = {
  user1: "123456",
  user2: "123456"
};


const LoginScreen = ({navigation}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleLogin = () => {
    if (validUsers[username] && validUsers[username] === password) {
      navigation.navigate("CourseList", {username});
    } else
    {
      setError(true);
    }
  }

  return (
    <View style={styles.container1}>
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
      {error && <Text style={styles.errorText}>Invalid username or password</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
};


export default LoginScreen;