import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import axios from 'axios';
import { Colors } from '../../assets/Colors';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
export const DefaultScreen: React.FC<Props> = ({ navigation }) => {
  const [sessionId, setSessionId] = useState('61d8b33c10a97c0022abd95b');
  // useEffect(() => {
  //   const url = `https://demo.upchieve.org`;
  //   axios.post(`${url}/auth/login`, {
  //       "email": "volunteer@nnnp.com",
  //       "password": "Demovolunteerpassword!"
  //   }).then(response => {
  //       console.log('logged in');
  //       const socket = io(url);
  //       socket.connect();
  //       setTimeout(() => console.log(socket.connected), 5000);
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='SessionId'
        placeholderTextColor={Colors.disabledGray}
        value={sessionId}
        onChangeText={setSessionId}
        style={{
          borderColor: Colors.softBlack,
          borderWidth: 1,
          paddingHorizontal: 16,
          paddingVertical: 5,
          borderRadius: 10,
          width: '60%',
        }}
      />
      <View style={[styles.separator, { borderBottomWidth: 2, borderBottomColor: 'black' }]} />
      <Button
        title="Whiteboard"
        disabled={sessionId.length === 0}
        onPress={() => navigation.navigate('Whiteboard', { sessionId })}
      />
      <View style={styles.separator} />
      <Button
        title="DocEditor"
        disabled={sessionId.length === 0}
        onPress={() => navigation.navigate('DocEditor', { sessionId })}
      />
      <View style={styles.separator} />
      <Button
        title="Chat"
        disabled={sessionId.length === 0}
        onPress={() => navigation.navigate('Chat', { sessionId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 20,
  },
});
