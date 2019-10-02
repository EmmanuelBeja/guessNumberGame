import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import DefaultStyles from '../constants/default-styles.js';
import Colors from '../constants/colors';

const Header = props => {
  return (
    <View style={{
      ...styles.containerBase,
      ...Platform.select({
        ios: styles.containerIOS,
        android: styles.containerAndroid
      })
    }}
    >
      <Text style={{...DefaultStyles.title, ...styles.title}}>{props.title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  containerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    // backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'white',
    // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  containerIOS: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  containerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'white',
    borderBottomWidth: 0
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  }
});

export default Header;
