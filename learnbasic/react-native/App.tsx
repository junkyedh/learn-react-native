import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  
  const [count, setCount] = useState<number>(0);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: '600'}}>
        Count = {count}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Button 
          color={'red'}
          title='Increase count' 
          onPress={() => setCount(count + 1)}
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
