import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = props => <TextInput {...props} style={{...styles.input, ...props.style}} />;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    textAlign: 'center',
    marginVertical: 10
  },
});

export default Input;
