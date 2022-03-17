import React, { useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';

type MaskedInputType = {
    onChangeText: (text: string, rawText: string) => void;
}

const Component: React.ForwardRefRenderFunction<any, MaskedInputType> = ({ onChangeText }, ref) => {
    const [isInFocus, setIsInFocus] = useState(false);
    return <View style={[styles.container, isInFocus && styles.containerInFocus]}>
        <Text style={styles.prefix}>+1</Text>
        <MaskedTextInput
            style={styles.input}
            ref={ref}
            placeholder=''
            mask='999-999-9999'
            maxLength={12}
            onChangeText={(i, e) => {
                onChangeText(i, `+1${e}`);
            }}
            keyboardType='number-pad'
            onFocus={() => setIsInFocus(true)}
            onBlur={() => setIsInFocus(false)}
        />
    </View>
};

export const PhoneInput = React.forwardRef(Component);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 13,
        paddingHorizontal: 17,
        height: 48,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerInFocus: {
        borderColor: Colors.information
    },
    input: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
        flex: 1,
    },
    prefix: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
        marginRight: 5,
    }
});