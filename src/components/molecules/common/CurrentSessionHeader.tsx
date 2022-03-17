import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { SvgIcons } from '../../../../assets/IndexIcons';
import { AlertContext } from '../../../providers/AlertProvider';
import { AuthContext } from '../../../providers/AuthProvider';
import { MainStackParamList } from '../../../routes/MainStackNavigator';
import { sessionService } from '../../../services/sessionService';
import { isSessionEnded } from '../../../utils/utils';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { insert } from "formik";
import { Session } from '../../../interfaces/sessionInterfaces';
import { ChatItem, } from '../../../reducers/chatReducer';

type CurrentSessionHeaderType = {
    navigation: NativeStackNavigationProp<MainStackParamList, "Session">;
    messages: ChatItem[];
}

export const CurrentSessionHeader: React.FC<CurrentSessionHeaderType> = ({ navigation, messages }) => {


    const authContext = useContext(AuthContext);
    const { sessionState } = authContext;
    const user = authContext.user!;
    const { showPrompt, showAlert } = useContext(AlertContext);
    const [waitingTimeout, setWaitingTimeout] = useState<any>();
    const isSessionStarted = () => !!sessionState?.volunteer;
    const insets = useSafeAreaInsets();
    const isWaitingForVolunteer = () => (!isSessionStarted() && !isSessionEnded(sessionState) && !user.isVolunteer);

    const getMessagesAfterVolunteerJoined = () => {
        // return sessionState?.messages.filter(
        //     message =>
        //         new Date(message.createdAt).getTime() >=
        //         new Date(sessionState!.volunteerJoinedAt!).getTime()
        // ) ?? [];
        return messages.filter(message =>
            message.user !== 'chatbot' &&
            message.time.getTime() >= new Date(sessionState!.volunteerJoinedAt!).getTime());
    }


    const shouldGoToFeedbackScreen = async () => {
        const msg = getMessagesAfterVolunteerJoined();
        if (isWaitingForVolunteer() || msg.length === 0) {
            return false;
        }
        for (const message of msg) {
            if (message.user === sessionState?.student._id || message.user === sessionState?.volunteer?._id) {
                return true;
            }
        }
        return false;
    }



    useEffect(() => {
        return () => waitingTimeout && clearTimeout();
    }, []);

    useEffect(() => {
        console.log('new date', sessionState);
        if (isWaitingForVolunteer() && !waitingTimeout) {
            const timeout = setTimeout(() => {
                showAlert({
                    title: 'We’re having trouble matching you with a coach',
                    text: 'Please try again later.',
                    icon: SvgIcons.RobotIcon,
                    type: 'success',
                    confirmText: 'Back to Dashboard',
                    onConfirm: () => {
                        navigate(true).then(() => {
                            navigation.navigate('DashboardScreen');
                        });
                    }
                })
            }, 1000 * 60 * 10); // 10 mins.
            setWaitingTimeout(timeout);
        }
        if (!!waitingTimeout && !isWaitingForVolunteer()) {
            clearTimeout(waitingTimeout)
            setWaitingTimeout(undefined);
        }
    }, [sessionState]);

    const navigate = async (closeSession: boolean = false) => {
        const shouldShowFeedback = await shouldGoToFeedbackScreen();
        if (closeSession) {
            await sessionService.endSession(sessionState!._id);
        }
        if (shouldShowFeedback) {
            if (sessionState?.type === 'college') {
                navigation.navigate('PostSessionSurveyCollege');
            } else {
                navigation.navigate('PostSessionSurvey');
            }

        } else {
            navigation.navigate('DashboardScreen');
        }
    }

    const handleButtonClick = async () => {
        if (isWaitingForVolunteer()) {
            showPrompt({
                title: 'Cancel Request',
                text: 'If you haven’t been waiting for at least 5 minutes, you won’t be able to make another request right away.',
                icon: SvgIcons.StopIcon,
                type: 'error',
                confirmText: 'Cancel   ',
                onConfirm: async () => {
                    await navigate(true);
                },
                cancelText: 'Not Now'
            })
        }
        else if (!isSessionEnded(sessionState)) {
            showPrompt({
                title: 'End Session',
                text: 'Are you sure you want to end the session?',
                icon: SvgIcons.StopIcon,
                type: 'error',
                confirmText: 'End',
                onConfirm: async () => {
                    await navigate(true);
                },
                cancelText: 'Not Now'
            })
        } else if (isSessionEnded(sessionState)) {
            showPrompt({
                title: 'Leave the session',
                text: 'Are you sure you want to leave the session?',
                icon: SvgIcons.LogoutIcon,
                type: 'information',
                confirmText: 'Leave',
                onConfirm: async () => {
                    await navigate();
                },
                cancelText: 'Not now',
            });
        }
    }

    const getTitleText = () => {
        if (isWaitingForVolunteer()) {
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

    const getButtonText = () => {
        if (isWaitingForVolunteer()) {
            return 'Cancel'
        }
        return !isSessionEnded(sessionState) ? 'End Session' : 'Leave'
    }

    return <View style={[styles.container, { height: 69 + insets.top, paddingTop: insets.top }, (isSessionEnded(sessionState) || !isSessionStarted()) && styles.containerSessionEnded]}>
        {!isSessionEnded(sessionState) ?
            <View style={styles.userContainer}>
                <Image style={styles.icon} source={renderImage()} />
                {/* <Image style={styles.icon} source={renderImage()} /> */}
                <View style={styles.textWrapper}>
                    <Text style={styles.titleText}>{getTitleText()}</Text>
                    <Text style={styles.inSessionText}>{!isWaitingForVolunteer() ? 'In Session' : 'Contacting coaches...'}</Text>
                </View>
            </View>
            : <Text style={styles.titleText}>Session Ended</Text>
        }
        {isSessionEnded(sessionState) && user.isVolunteer ? <Pressable onPress={() => navigation.navigate('ReportSessionScreen')}>
            <Text style={styles.reportText}>Report</Text>
        </Pressable> : null}
        <Pressable style={styles.buttonWrapper} onPress={handleButtonClick}>
            <Text style={styles.buttonTextStyle}>{getButtonText()}</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
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
    swapIcon: {
        backgroundColor: Colors.success,
        height: 69,
        width: 69,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
