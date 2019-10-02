import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  View,
  FlatList,
  Dimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import NumberComponent from '../components/NumberComponent';
import CustomButtom from '../components/CustomButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index} {itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onEndGame } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height);
      setDeviceWidth(Dimensions.get('window').width);
    }

    // listening to orientation changes
    Dimensions.addEventListener('change', updateLayout());
    return () => {
      Dimensions.removeEventListener('change', updateLayout());
    }
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onEndGame(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onEndGame]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        'Liar :(',
        "We both know thats not true.",
        [{text: 'Sorry', style: 'cancel'}]
      );
      return;
    }

    (direction === 'lower') ? currentHigh.current = currentGuess : currentLow.current = currentGuess + 1 ;

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  }

  let listContainerStyle = styles.listContainer;
  if (deviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.container}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <CustomButtom onPress={nextGuessHandler.bind(this, 'lower')} bgColor={'secondary'}>
            <Ionicons name="md-remove" size={24} color="white" />
          </CustomButtom>
          <NumberComponent>{currentGuess}</NumberComponent>
          <CustomButtom onPress={nextGuessHandler.bind(this, 'greater')} bgColor={'secondary'}>
            <Ionicons name="md-add" size={24} color="white" />
          </CustomButtom>
        </View>
        <View style={styles.listContainer}>
          {/*<ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, index))}
          </ScrollView>*/}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Opponent's Guess</Text>
      <NumberComponent>{currentGuess}</NumberComponent>
      <Card style={styles.btnContainer}>
        <CustomButtom onPress={nextGuessHandler.bind(this, 'lower')} bgColor={'secondary'}>
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButtom>
        <CustomButtom onPress={nextGuessHandler.bind(this, 'greater')} bgColor={'secondary'}>
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButtom>
      </Card>
      <View style={styles.listContainer}>
        {/*<ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, index))}
        </ScrollView>*/}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
    justifyContent: 'space-around',
  },
  controls: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '75%',
    justifyContent: 'space-around'
  },
  listContainer: {
    flex: 1,
    width: '75%'
  },
  listContainerBig: {
    width: '60%'
  },
  list: {
    alignItems: 'center'
  },
  listItem: {
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white'
  }
});

export default GameScreen;
