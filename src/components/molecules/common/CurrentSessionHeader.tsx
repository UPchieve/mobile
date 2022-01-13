import { FontDisplay } from 'expo-font';
import React, { useContext } from 'react';
import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { SvgIcons } from '../../../../assets/IndexIcons';
import { AlertContext } from '../../../providers/AlertProvider';
import { AuthContext } from '../../../providers/AuthProvider';
import { sessionService } from '../../../services/sessionService';

type SessionHeaderType = {
    isSessionEnded?: boolean;
};
export const CurrentSessionHeader: React.FC<SessionHeaderType> = ({ isSessionEnded }) => {
    const { user, currentSession } = useContext(AuthContext);
    const { showPrompt } = useContext(AlertContext);


    const handleButtonClick = async () => {
        if (!isSessionEnded) {
            showPrompt({
                title: 'End Session',
                text: 'Are you sure you want to end the session?',
                icon: SvgIcons.StopIcon,
                type: 'error',
                confirmText: 'End',
                onConfirm: new Promise<void>((resolve) => {setTimeout(() => resolve(), 5000)}),
                cancelText: 'Not Now'
            })
            // console.log(currentSession);
            // await sessionService.endSession(currentSession!.sessionId);
        }
    }

    return <View style={[styles.container, isSessionEnded && styles.containerSessionEnded]}>
        {!isSessionEnded ?
            <View style={styles.userContainer}>
                <Image style={styles.icon}
                    source={user.isVolunteer ? ImageIndex.avatars.volunteer : ImageIndex.avatars.student} />
                <View style={styles.textWrapper}>
                    <Text style={styles.titleText}>{user.isVolunteer ? 'Volunteer' : 'Student'}</Text>
                    <Text style={styles.inSessionText}>In Session</Text>
                </View>
            </View>
            : <Text style={styles.titleText}>Session Ended</Text>
        }
        {isSessionEnded && user.isVolunteer ? <Text style={styles.reportText}>Report</Text> : null}
        <Pressable style={styles.buttonWrapper} onPress={handleButtonClick}>
            <Text style={styles.buttonTextStyle}>{!isSessionEnded ? 'End Session' : 'Leave'}</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 69,
        width: '100%',
        backgroundColor: Colors.information,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 15,
    },
    containerSessionEnded: {
        backgroundColor: Colors.defaultGray
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 40,
        width: 40,
    },
    textWrapper: {
        marginLeft: 15,
    },
    titleText: {
        fontFamily: FontIndex.WorkSans.Bold,
        fontSize: 18,
        color: '#FFFF',
    },
    inSessionText: {
        fontFamily: FontIndex.WorkSans.Regular,
        color: '#FFFF',
        fontSize: 14,
    },
    buttonWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#FFFF',
    },
    buttonTextStyle: {
        color: '#FFFF',
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
    },
    reportText: {
        color: '#FFFF',
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
    }
});