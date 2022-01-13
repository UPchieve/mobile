import React, { useContext, useEffect, useState } from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { Colors } from '../../assets/Colors';
import { AuthContext, } from '../providers/AuthProvider';
import { authService } from '../services/authService';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
export const DefaultScreen: React.FC<Props> = ({ navigation }) => {
  const [sessionId, setSessionId] = useState('61e032e6b6721300227c8a33');

  const { socketHandler } = useContext(AuthContext);

  useEffect(() => {
    authService.login().then(() => console.log('loguea2'));
  }, []);

  useEffect(() => {
    console.log('connected change', socketHandler.connected);
  }, [socketHandler.connected]);

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
        title="Join"
        disabled={sessionId.length === 0}
        onPress={() => navigation.navigate('Session', { sessionId })}
      />
      {/* <Button
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
      /> */}
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
