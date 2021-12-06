import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { MainStackParamList } from '../routes/MainStackNavigator';

type WhiteboardType = NativeStackScreenProps<MainStackParamList, 'Whiteboard'>;
export const WhiteBoardScreen: React.FC<WhiteboardType> = () => {
  return (
    <View>
      <Text>Whiteboard screen</Text>
    </View>
  );
};
