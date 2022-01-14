import React, { useContext, useEffect, useState } from 'react';
import { Button, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { Colors } from '../../assets/Colors';
import { AuthContext, } from '../providers/AuthProvider';
import { authService } from '../services/authService';
import { delay } from '../utils/utils';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
export const DefaultScreen: React.FC<Props> = ({ navigation }) => {
  const [sessionId, setSessionId] = useState('61e190eab6721300227caa71');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refreshUser } = useContext(AuthContext);

  useEffect(() => {
    //login as student;
    // authService.login('student@nnnp.com', 'Demostudentpassword!').then(() => console.log('loguea2'));
    //login as volVnteer
  }, []);


  const enterAs = async (type: 'student' | 'volunteer') => {
    await authService.logout();
    if (type === 'student') {
      await authService.login('student@nnnp.com', 'Demostudentpassword!');
    } else {
      await authService.login();
    }
    refreshUser();
    await delay(1000);
    navigation.navigate('Session', { sessionId });
  }


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
        title="Enter to the session as Student"
        disabled={sessionId.length === 0}
        onPress={() => enterAs('student')}
      />
      <Button
        title="Enter to the session as Volunteer"
        disabled={sessionId.length === 0}
        onPress={() => enterAs('volunteer')}
      />
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {isLoading ? <ActivityIndicator /> : null}
      </View>

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
