import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { HouseIcon } from '../../../../assets/icons/HouseIcon';
import { Separator } from '../common/Separator';

type SessionFeedbackHeaderType = {
    onIconPress: () => void;
}
export const SessionFeedbackHeader: React.FC<SessionFeedbackHeaderType> = ({onIconPress}) => {
    return <><View style={styles.container}>
        <View />
        <Text style={styles.text}>
            Session Feedback
        </Text>
        <TouchableOpacity onPress={onIconPress}>
            <HouseIcon />
        </TouchableOpacity>
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
    text: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: FontIndex.WorkSans.Bold,
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