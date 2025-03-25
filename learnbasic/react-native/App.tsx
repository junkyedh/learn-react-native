import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  
const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Doe', age: 21 },
    { id: 3, name: 'John Smith', age: 22 },
    { id: 4, name: 'Jane Smith', age: 23 },
    { id: 5, name: 'John Brown', age: 24 },
    { id: 6, name: 'Jane Brown', age: 25 },
    { id: 7, name: 'John White', age: 26 },
    { id: 8, name: 'Jane White', age: 27 },
    { id: 9, name: 'John Black', age: 28 },
    { id: 10, name: 'Jane Black', age: 29 },
    { id: 11, name: 'John Green', age: 30 },
    { id: 12, name: 'Jane Green', age: 31 },
    { id: 13, name: 'John Blue', age: 32 },
  ]);
  return (
    <View style={styles.container}>
      <Text style={{alignSelf: "center", paddingVertical: 20, fontSize: 30}}>List Students</Text>
      <ScrollView>
        {students.map(students => {
          return (
            <View key = {students.id} style={{padding: 30, backgroundColor: 'lightblue', marginBottom: 30}}>
              <Text>{students.id}. {students.name} - {students.age}</Text>
            </View>
          );
        })}
      </ScrollView> 
    </View>
  );
}

//css in js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,

  },
});
