import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TextInputBase, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from "../../../../assets/Colors"
import { FontIndex } from '../../../../assets/FontIndex'
import { SvgIcons } from '../../../../assets/IndexIcons'

export type InputType = {
    value?: string,
    onChangeText?: (value: string) => void,
    isValid?: boolean,
    touched?: boolean,
    errorMessage?: string,
    placeholder?: string,
    password?: boolean,
    showCheck?: boolean,
} & TextInputProps;
export const Input: React.FC<InputType> = ({ value, onChangeText, isValid, errorMessage, placeholder, password = false, touched = false, showCheck = false, ...props }) => {
    TextInputBase
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isInFocus, setIsInFocus] = useState(false);

    const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsInFocus(false);
        if (props.onBlur) {
            props.onBlur(event);
        }
    }

    const renderIcon = () => {
        if (!touched)
            return null;
        if (isValid === false) {
            return <SvgIcons.CloseIcon fill={Colors.error} height={15} width={15} />
        } else if (isValid === true && showCheck) {
            return <SvgIcons.CheckIcon fill={Colors.success} />
        }
        return null;
    }
    return <>
        <View style={[styles.container
            , isInFocus && styles.containerInFocus
            , touched && isValid === false && styles.containerError
            , touched && isValid === true && styles.containerSuccess]}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={[styles.input
                        , touched && isValid === false && styles.inputError]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.defaultGray}
                    value={value}
                    secureTextEntry={password && secureTextEntry === true}
                    onChangeText={(value) => onChangeText && onChangeText(value)}
                    onFocus={() => setIsInFocus(true)}
                    {...props}
                    onBlur={handleBlur}
                />
                {renderIcon()}
                {password ?
                    <TouchableOpacity onPress={() => setSecureTextEntry(currentValue => !currentValue)}>
                        {secureTextEntry
                            ? <SvgIcons.VisibilityHiddenIcon fill={Colors.secondaryGray} />
                            : <SvgIcons.VisibilityShowIcon fill={Colors.secondaryGray} />
                        }
                    </TouchableOpacity>
                    : null}
            </View>
        </View>
        {touched && isValid === false && errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
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
    containerInFocus: {
        borderColor: Colors.information
    },
    containerSuccess: {
        borderColor: Colors.success,
    },
    inputWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingRight: 0,
        alignItems: 'center'
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
    //TODO Review the size of the top margin.
    errorMessage: {
        marginLeft: 2,
        marginTop: 15,
        marginBottom: 10,
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
