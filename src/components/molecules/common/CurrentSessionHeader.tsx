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
import { isSessionEnded } from '../../../utils/utils';

export const CurrentSessionHeader: React.FC = () => {


    const { user, sessionState } = useContext(AuthContext);
    const { showPrompt } = useContext(AlertContext);

    const isSessionStarted = () => !!sessionState?.volunteer;

    const handleButtonClick = async () => {
        if (!isSessionEnded(sessionState)) {
            showPrompt({
                title: 'End Session',
                text: 'Are you sure you want to end the session?',
                icon: SvgIcons.StopIcon,
                type: 'error',
                confirmText: 'End',
                onConfirm: async () => await sessionService.endSession(sessionState!._id),
                cancelText: 'Not Now'
            })
        }
    }

    const getTitleText = () => {
        if (!isSessionStarted()) {
            return 'UPchieve Bot'
        }
        return !user.isVolunteer ? 'Volunteer' : 'Student';
    }

    const renderImage = () => {
        if (!isSessionStarted()) {
            return ImageIndex.avatars.chatbot;
        }
        return !user.isVolunteer ? ImageIndex.avatars.volunteer : ImageIndex.avatars.student;
    }

    return <View style={[styles.container, (isSessionEnded(sessionState) || !isSessionStarted()) && styles.containerSessionEnded]}>
        {!isSessionEnded(sessionState) ?
            <View style={styles.userContainer}>
                <Image style={styles.icon} source={renderImage()} />
                <View style={styles.textWrapper}>
                    <Text style={styles.titleText}>{getTitleText()}</Text>
                    <Text style={styles.inSessionText}>{isSessionStarted() ? 'In Session' : 'Contacting coaches...'}</Text>
                </View>
            </View>
            : <Text style={styles.titleText}>Session Ended</Text>
        }
        {isSessionEnded(sessionState) && user.isVolunteer ? <Text style={styles.reportText}>Report</Text> : null}
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
    },
});