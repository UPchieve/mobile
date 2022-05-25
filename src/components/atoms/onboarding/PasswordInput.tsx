import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TextInputProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { SvgIcons } from '../../../../assets/IndexIcons'
import {
  hasLowerCase,
  hasNumbers,
  hasUpperCase,
  randomString,
} from '../../../utils/utils'

const passwordValidationSteps = [
  {
    fn: hasLowerCase,
    errorMessage: 'one lower case',
  },
  {
    fn: hasUpperCase,
    errorMessage: 'one upper case',
  },
  {
    fn: hasNumbers,
    errorMessage: '1 number',
  },
]

export type PasswordInputType = {
  value: string
  onChangeText?: (value: string) => void
  isValid?: boolean
  touched?: boolean
  message?: string
  allwaysShowMessage?: boolean
  showPasswordBars?: string
  placeholder?: string
  setClearValue: (arg: boolean) => void
} & TextInputProps
export const PasswordInput: React.FC<PasswordInputType> = ({
  value,
  onChangeText,
  isValid,
  message,
  placeholder,
  allwaysShowMessage = false,
  touched = false,
  setClearValue,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const renderIcon = () => {
    if (!touched) return null
    if (isValid === true) {
      return <SvgIcons.CheckIcon fill={Colors.success} />
    } else if (isValid === false) {
      return (
        <TouchableOpacity onPress={() => setClearValue(true)}>
          <SvgIcons.CloseIcon height={15} width={15} fill={Colors.error} />
        </TouchableOpacity>
      )
    }
    return null
  }
  const renderMessage = () => {
    const msg = buildErrorMessage()
    if (touched && isValid === false) {
      return <Text style={[styles.message, styles.errorMessage]}>{msg}</Text>
    }
    if (allwaysShowMessage) {
      return <Text style={[styles.message]}>{msg}</Text>
    }
    return null
  }

  const buildErrorMessage = (): string | null => {
    const errors = passwordValidationSteps
      .filter((x) => !x.fn(value))
      .map((e) => e.errorMessage)
    if (errors.length === 0) {
      return null
    }
    let msg = `Password must contain at least ${errors[0]}`
    if (errors[1] && !errors[2]) {
      msg += ` and ${errors[1]}`
    } else if (errors[1] && errors[2]) {
      msg += `, ${errors[1]} and ${errors[2]}`
    }
    return msg
  }

  const renderSteps = () => {
    const validationResults = passwordValidationSteps.reduce((acum, x) => {
      return !x.fn(value) ? acum + 1 : acum
    }, 0)
    return (
      <>
        <View
          style={{
            width: '100%',
            height: 4,
            marginTop: 8,
            flexDirection: 'row-reverse',
          }}
        >
          {passwordValidationSteps.map((_, i) => (
            <View
              key={randomString()}
              style={{
                flex: 1,
                backgroundColor: !touched
                  ? Colors.defaultGray
                  : i >= validationResults
                  ? Colors.success
                  : Colors.error,
                height: 4,
                borderRadius: 4,
                marginRight: i === 0 ? 0 : 8,
              }}
            />
          ))}
        </View>
        {renderMessage()}
      </>
    )
  }

  return (
    <>
      <View
        style={[
          styles.container,
          touched && isValid === false && styles.containerError,
          touched && isValid === true && styles.containerSuccess,
        ]}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              touched && isValid === false && styles.inputError,
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.defaultGray}
            value={value}
            secureTextEntry={secureTextEntry === true}
            onChangeText={(value) => onChangeText && onChangeText(value)}
            {...props}
          />
          {renderIcon()}
          <TouchableOpacity
            onPress={() => setSecureTextEntry((currentValue) => !currentValue)}
          >
            {secureTextEntry ? (
              <SvgIcons.VisibilityHiddenIcon fill={Colors.secondaryGray} />
            ) : (
              <SvgIcons.VisibilityShowIcon fill={Colors.secondaryGray} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {renderSteps()}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 23,
    paddingVertical: 13,
    borderColor: Colors.borderGray,
    borderWidth: 1,
    borderRadius: 4,
  },
  containerError: {
    borderColor: Colors.error,
  },
  containerSuccess: {
    borderColor: Colors.success,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: 0,
    alignItems: 'center',
  },
  input: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 15,
    // flexGrow: 1,
    color: Colors.softBlack,
    flex: 1,
    marginRight: 10,
  },
  inputError: {
    color: Colors.error,
  },
  message: {
    marginLeft: 2,
    marginTop: 8,
    marginBottom: 10,
    fontSize: 14,
    color: Colors.secondaryGray,
    fontFamily: FontIndex.WorkSans.Regular,
  },
  errorMessage: {
    color: Colors.error,
  },
  icons: {
    height: 30,
    right: 0,
    position: 'absolute',
  },
})
