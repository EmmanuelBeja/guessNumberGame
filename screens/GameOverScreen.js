import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import DefaultStyles from '../constants/default-styles.js';
import CustomButtom from '../components/CustomButton';

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={DefaultStyles.title}>The Game is Over!</Text>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={500}
            style={styles.image}
            // source={require('../assets/success.png')}
            source={{
              uri: 'https://i.pinimg.com/originals/6c/7a/63/6c7a63fbd616e24c42a3b9b427389d92.jpg'
            }}
            resizeMode="cover"
          />
        </View>
        <Text style={{...DefaultStyles.bodyText, ...styles.resultText}}>
          We did {props.roundsNumber} rounds to guess that you entered the value {props.userNumber}
        </Text>
        <CustomButtom onPress={props.onRestart} bgColor={'secondary'}>
          New Game
        </CustomButtom>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: 150, //half of the width and height
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 20
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    marginHorizontal: 30,
    marginVertical: 30
  }
});

export default GameOverScreen;
