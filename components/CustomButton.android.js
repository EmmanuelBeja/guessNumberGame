import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../constants/colors';

const CustomButtom = props => {
  let BtnComponent = TouchableOpacity;
  if (Platform.version > 21) {
    BtnComponent = TouchableNativeFeedback;
  }
  return (
    <BtnComponent onPress={props.onPress}>
       <View style={props.bgColor === 'secondary' ? styles.btnSecondary : styles.btnPrimary }>
         <Text style={styles.buttonText}>
           {props.children}
         </Text>
       </View>
    </BtnComponent>
  )
};

const styles = StyleSheet.create({
  btnPrimary: {
    minWidth: Dimensions.get('window').width * 0.2,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnSecondary: {
    minWidth: Dimensions.get('window').width * 0.2,
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans'
  }
});

export default CustomButtom;
