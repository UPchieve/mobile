import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
export const DefaultScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Whiteboard"
        onPress={() => navigation.navigate('Whiteboard')}
      />
      <View style={styles.separator}/>
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
    alignItems: 'center'
  },
  separator: {
    marginVertical: 20,
  }
});
