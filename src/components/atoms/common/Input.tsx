import React from 'react'
import { View, StyleSheet, TextInput, Text } from "react-native"
import { Colors } from "../../../../assets/Colors"
import { FontIndex } from '../../../../assets/FontIndex'
import { SvgIcons } from '../../../../assets/IndexIcons'

type InputType = {
    value?: string,
    onChangeText?: (value: string) => void,
    isValid?: boolean,
    errorMessage?: string,
    placeholder?: string,
    password?: boolean,
}
export const Input: React.FC<InputType> = ({ value, onChangeText, isValid, errorMessage, placeholder, password = false }) => {
    const renderIcon = () => {
        if (isValid === true) {
            return <SvgIcons.CheckIcon fill={Colors.success} />
        } else if (isValid === false) {
            return <SvgIcons.CloseIcon stroke={Colors.error} />
        }
        return null;
    }
    return <>
        <View style={[styles.container
            , isValid === false && styles.containerError
            , isValid === true && styles.containerSuccess]}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={[styles.input
                        , isValid === false && styles.inputError]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.secondaryGray}
                    value={value}
                    secureTextEntry={password === true}
                    onChangeText={(value) => onChangeText && onChangeText(value)}
                />
                <View style={styles.icons}>
                    {renderIcon()}
                </View>
            </View>
        </View>
        {isValid === false && errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </>
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
    },
    input: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 15,
        // flexGrow: 1,
        flex: 1,
        marginRight: 10,
    },
    inputError: {
        color: Colors.error,
    },
    errorMessage: {
        marginLeft: 2,
        marginTop: 15,
        color: Colors.error,
        fontSize: 14,
        fontFamily: FontIndex.WorkSans.Regular,
    },
    icons: {
        height: 30,
        right: 0,
        position: 'absolute',
    }
})