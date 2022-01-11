import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors, PrimaryColorType } from '../../../assets/Colors';
import {FontIndex} from "../../../assets/FontIndex";

interface ICommonButton {
  title: string;
  onPress: () => void;
  type?: PrimaryColorType;
  style?: StyleProp<ViewStyle>;
}

export const CommonButton: React.FC<ICommonButton> = ({
  title,
  onPress,
  type,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type && { backgroundColor: Colors[type], borderWidth: 0 },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, type && { color: 'white' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D6E0EF',
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 16,
    color: '#343440',
    textAlign: 'center'
  },
});
