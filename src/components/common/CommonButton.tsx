import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors, PrimaryColorType } from '../../../assets/Colors';
import { FontIndex } from "../../../assets/FontIndex";

interface ICommonButton {
  title: string;
  onPress: () => void;
  type?: PrimaryColorType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const CommonButton: React.FC<ICommonButton> = ({
  title,
  onPress,
  type,
  style,
  disabled = false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type && { backgroundColor: Colors[type], borderWidth: 0 },
        disabled && styles.buttonDisabled,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, type && { color: 'white' }, disabled && styles.buttonTextDisabled]}>
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
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 16,
    color: '#343440',
    textAlign: 'center'
  },
  buttonDisabled: {
    backgroundColor: Colors.backgroundGray,
    borderColor: undefined,
  },
  buttonTextDisabled: {
    color: Colors.defaultGray,
  }
});
