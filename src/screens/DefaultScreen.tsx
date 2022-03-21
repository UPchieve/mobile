import React, { useContext, useEffect, useState } from 'react';
import { Button, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Colors } from '../../assets/Colors';
import { AuthContext, } from '../providers/AuthProvider';
import { authService } from '../services/authService';
import { delay } from '../utils/utils';

export const DefaultScreen: React.FC = ({  }) => {
  const [sessionId, setSessionId] = useState('61eb00e25b4a66e264e49129');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refreshUser } = useContext(AuthContext);


  const enterAs = async (type: 'student' | 'volunteer') => {
    setIsLoading(true);
    try {
      const data = await authService.logout();
      console.log('logout response', data);
      if (type === 'student') {
        await authService.login('student@nnnp.com', 'Demostudentpassword!');
      } else {
        await authService.login('volunteer@nnnp.com', 'Demovolunteerpassword!');
      }
      refreshUser();
      await delay(1000);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
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
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 200 }}>
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
