import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle, Image, View, ImageSourcePropType,
} from 'react-native';
import { Colors, PrimaryColorType } from '../../../assets/Colors';
import { FontIndex } from "../../../assets/FontIndex";

interface ICommonButton {
  title: string;
  onPress: () => void;
  type?: PrimaryColorType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  rightIcon?: any
}

export const CommonButton: React.FC<ICommonButton> = ({
  title,
  onPress,
  type,
  style,
  disabled = false,
  rightIcon = null
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
      <View style={styles.buttonWrap}>
        <Text style={[styles.buttonText, type && { color: 'white' }, disabled && styles.buttonTextDisabled]}>
          {title}
        </Text>
        {rightIcon ?
          <Image style={styles.icon}
            source={rightIcon} />
          : null
        }
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.defaultGray,
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
  },
  icon: {
    width: 16,
    marginLeft: 10
  },
  buttonWrap: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
