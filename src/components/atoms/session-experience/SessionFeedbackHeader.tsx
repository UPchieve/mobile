import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { HouseIcon } from '../../../../assets/icons/HouseIcon';
import { Separator } from '../common/Separator';

export const SessionFeedbackHeader: React.FC = () => {
    return <><View style={styles.container}>
        <View />
        <Text style={styles.text}>
            Session Feedback
        </Text>
        <HouseIcon />
    </View>
        <View style={styles.shadows}>
            <Separator />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    //TODO TYPHOGRAFY Work Sans
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.softBlack,
    },
    //TODO review this shadow.
    shadows: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    }
});