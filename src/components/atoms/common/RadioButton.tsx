import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
type RadioButtonType = {
    selected: boolean,
    text: string,
    onPress?: () => void,
}
export const RadioButton: React.FC<RadioButtonType> = ({ selected, text, onPress }) => {
    return <Pressable style={[styles.container, selected && styles.containerSelected]} onPress={() => onPress && onPress()}>
        <View style={[styles.radio, selected && styles.radioSelected]} />
        <Text numberOfLines={2} style={styles.text}>{text}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 60,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        paddingLeft: 16,
        paddingRight: 20,
    },
    containerSelected: {
        borderColor: Colors.success,
        backgroundColor: Colors.selectedGreen,
    },
    radio: {
        height: 16,
        width: 16,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        borderRadius: 100,
        marginRight: 8,
    },
    radioSelected: {
        borderWidth: 4,
        borderColor: Colors.success,
    },
    text: {
        fontSize: 16,
        fontFamily: FontIndex.WorkSans.Regular,
        flexShrink: 1,
    }
});