import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
interface MedalType {
  fullRounded: boolean
  disabled: boolean
  selected: boolean
  value: number | string
  onPress?: () => void
}
export const Medal: React.FC<MedalType> = ({
  value,
  disabled = false,
  selected,
  fullRounded,
  onPress = () => {},
}) => {
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          fullRounded && styles.fullRoundedContainer,
          disabled && styles.disabledContainer,
          selected && styles.selectedContainer,
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            fullRounded && styles.fullRoundedText,
            selected && styles.selectedText,
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'flex-start',
    height: 31,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  text: {
    fontSize: 14,
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.defaultGray,
  },
  selectedContainer: {
    borderColor: Colors.success,
    backgroundColor: Colors.selectedGreen,
  },
  selectedText: {
    color: Colors.hoverGreen,
  },
  fullRoundedContainer: {
    borderRadius: 100,
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 40,
    width: 40,
  },
  fullRoundedText: {
    fontSize: 18,
  },
  disabledContainer: {
    backgroundColor: Colors.backgroundGray,
  },
})
