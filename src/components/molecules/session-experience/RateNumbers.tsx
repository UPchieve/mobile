import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native"
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { Medal } from '../../atoms/session-experience/Medal';

interface RateNumbers {
    selected?: number;
    setSelected: (selected: number) => void
    parentStyle?: StyleProp<ViewStyle>
}
export const RateNumbers: React.FC<RateNumbers> = ({ selected, setSelected, parentStyle }) => {
    return <View style={parentStyle}>
        <View style={styles.medalContainer}>
            {[1, 2, 3, 4, 5].map(item => {
                return <Medal key={item}
                    value={item}
                    disabled={false}
                    fullRounded={true}
                    selected={item === selected}
                    onPress={() => setSelected(item)} />
            })}
        </View>
        <View style={styles.textIndicators}>
            <Text style={styles.textIndicator}>Not at all</Text>
            <Text style={styles.textIndicator}>Yes, 100%!</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    medalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    textIndicators: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 5,
        marginVertical: 5,
    },
    textIndicator: {
        color: Colors.secondaryGray,
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 12,
    }
});