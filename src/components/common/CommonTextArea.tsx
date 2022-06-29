import React, { useState } from 'react'
import { Colors } from '../../../assets/Colors'
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'

interface ICommonButton {
  value?: string | undefined
  onChangeText?: (arg: string) => void | undefined
  style?: StyleProp<ViewStyle>
  placeholder?: string
  borderColorSelected?: string
}

export const CommonTextArea: React.FC<ICommonButton> = ({
  style,
  onChangeText,
  value,
  placeholder = '',
  borderColorSelected = Colors.success,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }
  return (
    <View
      style={[
        styles.container,
        isFocused && { borderColor: borderColorSelected },
      ]}
    >
      <TextInput
        style={[
          styles.textInput,
          style,
          placeholder !== '' && styles.placeholder,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        value={value}
        multiline
        placeholder={placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 148,
    borderWidth: 0.5,
    paddingTop: 13,
    paddingLeft: 16,
    paddingRight: 21,
    borderColor: Colors.borderGray,
  },
  textInput: {
    textAlignVertical: 'top',
    flex: 1,
  },
  placeholder: {
    flexWrap: 'wrap',
  },
})
