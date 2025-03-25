import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 60, fontWeight: '400'}}>Name: {name}</Text>
        <TextInput 
          multiline
          style={{height: 60, borderColor: 'gray', borderWidth: 1, padding: 10, width: 200}}
          onChangeText={(value) => setName(value)}
        />
      </View>

      <View>
        <Text style={{fontSize: 60, fontWeight: '400'}}>Age: {age}</Text>
        <TextInput
          keyboardType='numeric'
          maxLength={2}
          style={{height: 60, borderColor: 'gray', borderWidth: 1, padding: 10, width: 200}}
          onChangeText={(value) => setAge(+value)}
        />
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
});
