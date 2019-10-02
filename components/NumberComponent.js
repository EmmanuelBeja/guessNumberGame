import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/colors';

const NumberComponent = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.secondary,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'grey',
    fontSize: 22
  }
});

export default NumberComponent;
