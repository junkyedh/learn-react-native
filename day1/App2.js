
import { Component, useState } from 'react';
import {StyleSheet, SafeAreaView, Text, View } from 'react-native';

class flexbox extends Component {
    render(){
      let number = 3;
      return (
        <SafeAreaView>
          <View style={{height:20}}></View>
          <Text>
            {number > 5 ? 'Greater than 5': 'Less than 5'}
          </Text>
          {[...Array(number)].map((x,i) =>
            <Text>{i+1}</Text>
          )}
        </SafeAreaView>
      )
    }
  }
  
  export default flexbox;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  