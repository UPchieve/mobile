import React, { useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import io from 'socket.io-client';
import axios from 'axios';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
export const DefaultScreen: React.FC<Props> = ({ navigation }) => {
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
      <Button
        title="Whiteboard"
        onPress={() => navigation.navigate('Whiteboard')}
      />
      <View style={styles.separator} />
      <Button
        title="DocEditor"
        onPress={() => navigation.navigate('DocEditor')}
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
