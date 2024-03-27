import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  View,
  ActivityIndicator,
} from 'react-native'
import { Colors, PrimaryColorType } from '../../../assets/Colors'
import { FontIndex } from '../../../assets/FontIndex'
import { SvgFC } from '../../../assets/icons/SvgInterface'

interface ICommonButton {
  title: string
  onPress: () => void
  type?: PrimaryColorType
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  rightIcon?: any
  loading?: boolean
  SvgIcon?: SvgFC
  colorText?: string
  borderColor?: string
}

export const CommonButton: React.FC<ICommonButton> = ({
  title,
  onPress,
  type,
  style,
  loading = false,
  disabled = false,
  rightIcon = null,
  SvgIcon = null,
  colorText = '#343440',
  borderColor = Colors.defaultGray,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type
          ? { backgroundColor: Colors[type], borderWidth: 0 }
          : { borderColor: borderColor },
        disabled && styles.buttonDisabled,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.buttonWrap}>
        <Text
          style={[
            styles.buttonText,
            type ? { color: 'white' } : { color: colorText },
            disabled && styles.buttonTextDisabled,
            loading && { color: 'transparent' },
          ]}
        >
          {title}
        </Text>
        {rightIcon ? <Image style={styles.icon} source={rightIcon} /> : null}
        {SvgIcon ? (
          <View style={{ marginLeft: 15 }}>
            <SvgIcon fill="white" />
          </View>
        ) : null}
        {loading ? <ActivityIndicator style={styles.loadingIndicator} /> : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    height: 48,
  },
  buttonText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 16,
    textAlign: 'center',
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
    marginLeft: 10,
  },
  buttonWrap: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
  },
})
