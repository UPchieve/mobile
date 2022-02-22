import { Logs } from 'expo';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { Input, InputType } from './Input';

type customErrorType = {
    key: string,
    Error: () => JSX.Element
}
type InputWithCustomErrorMessageType = {
    errors: customErrorType[];
    defaultValue?: any;
} & InputType;

export const InputWithCustomErrorMessage: React.FC<InputWithCustomErrorMessageType> = (props) => {
    const { touched, isValid, errors, errorMessage, defaultValue } = props;
    const [customError, setCustomError] = useState<boolean>(false);
    const [error, setError] = useState<customErrorType | undefined>();

    useEffect(() => {
        const error = errors.find(e => e.key === errorMessage);
        if (error) {
            setCustomError(true);
            setError(error);
        } else {
            setCustomError(false);
        }
    }, [errors, errorMessage]);

    return (
        <View>
            <Input {...props} errorMessage={customError ? undefined : props.errorMessage} />
            {touched && isValid === false && error ?
                <View style={styles.errorWrapper}>
                    <error.Error />
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    errorWrapper: {
        marginLeft: 2,
        marginTop: 15,
        marginBottom: 10,
    },
})

export const InputWithCustomErrorMessageStyles = StyleSheet.create({
    errorText: {
        color: Colors.error,
        fontSize: 14,
        fontFamily: FontIndex.WorkSans.Regular,
    },
    errorLinkText: {
        color: Colors.information,
        fontSize: 14,
        fontFamily: FontIndex.WorkSans.Regular,
    }
});
