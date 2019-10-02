import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import Input from '../components/Input';
import DefaultStyles from '../constants/default-styles.js';
import NumberComponent from '../components/NumberComponent';
import CustomButtom from '../components/CustomButton';


const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }

    // listening to orientation changes
    Dimensions.addEventListener('change', updateLayout());
    return () => {
      Dimensions.removeEventListener('change', updateLayout());
    }
  })


  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Please enter a Number between 1 and 99',
        [
          {
            text: 'Ok',
            onPress: resetInputHandler,
            style: 'destructive',
          }
        ],
        {cancelable: false},
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected:</Text>
        <NumberComponent>{selectedNumber}</NumberComponent>
        <CustomButtom onPress={() => {props.onStartGame(selectedNumber)}}>
          Start Game!
        </CustomButtom>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={styles.container}>
            <Text style={{...DefaultStyles.title, ...styles.startGameTitle}}>Start Game</Text>
            <Card style={styles.inputContainer}>
              <Text style={DefaultStyles.bodyText}>Select A Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
                />
              <View style={styles.btnContainer}>
                <View style={{width: buttonWidth}}>
                  <CustomButtom onPress={resetInputHandler} bgColor={'secondary'}>
                    <Ionicons name="ios-refresh" size={16} color="white" />
                    Reset
                  </CustomButtom>
                </View>
                <View style={{width: buttonWidth}}>
                  <CustomButtom onPress={confirmInputHandler}>
                    <Ionicons name="ios-checkmark-circle" size={16} color="white" />
                    Cool
                  </CustomButtom>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  startGameTitle: {
    marginVertical: 10
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: '80%'
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
