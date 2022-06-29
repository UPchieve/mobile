import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { SvgIcons } from '../../../../assets/IndexIcons'

type InputCheckboxType = {
  value: boolean
  onChange: (value: boolean) => void
  label: string
  mt?: number
  mb?: number
  touched?: boolean
  isValid?: boolean
  errorMessage?: string
}
export const InputCheckBox: React.FC<InputCheckboxType> = ({
  value,
  onChange,
  label,
  mt = 0,
  mb = 0,
  touched = false,
  isValid,
  errorMessage,
}) => {
  return (
    <View style={{ marginTop: mt, marginBottom: mb }}>
      <View style={[styles.container]}>
        <TouchableOpacity
          style={[styles.checkStyle, value && styles.checkStyleChecked]}
          onPress={() => onChange(!value)}
        >
          {value ? <SvgIcons.CheckIcon fill="white" /> : null}
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </View>
      {touched &&
      isValid === false &&
      errorMessage &&
      errorMessage?.length > 0 ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkStyle: {
    height: 20,
    width: 20,
    borderColor: Colors.borderGray,
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checkStyleChecked: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  label: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 14,
    color: Colors.secondaryGray,
  },
  errorMessage: {
    marginLeft: 2,
    marginTop: 15,
    marginBottom: 10,
    color: Colors.error,
    fontSize: 14,
    fontFamily: FontIndex.WorkSans.Regular,
  },
})
