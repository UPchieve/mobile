import React, {useEffect, useRef, useState} from "react";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { H3 } from "../../../components/atoms/common/H3";
import { HelperText } from "../../../components/atoms/onboarding/HelperText";
import { Colors } from "../../../../assets/Colors";
import { Separator } from "../../../components/atoms/common/Separator";
import { FontIndex } from "../../../../assets/FontIndex";
import { ProgressBar } from "../../../components/atoms/common/ProgressBar";
import { RadioGroup } from "../../../components/molecules/common/RadioGroup";
import { CommonButton } from "../../../components/common/CommonButton";
import { preSessionFeedbackQuestions, QuestionType } from "../../../utils/sessionFeedback";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { sessionService } from "../../../services/sessionService";
import { SessionFeedbackHeader } from "../../../components/atoms/session-experience/SessionFeedbackHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../routes/MainStackNavigator";
import messaging from '@react-native-firebase/messaging';
import {useSafeAreaInsets} from "react-native-safe-area-context";


type QuestionFCType = {
    backButtonAction?: () => void;
    startChatButtonAction?: () => void;
    isValid: boolean;
    isSubmitting: boolean;
    onSelect: (value: SelectItem) => void;
} & QuestionType


const maxWidth = Dimensions.get('screen').width;
const Question: React.FC<QuestionFCType> = ({ title, options, onSelect, backButtonAction, startChatButtonAction, isValid, isSubmitting }) => {
    return <View style={{ marginTop: 16, width: maxWidth }}>
        <View style={{
            // flex: 1,
            paddingTop: 16,
            paddingHorizontal: 20,
        }}>
            <View style={styles.optionsCard}>
                <Text style={styles.questionTitle}>{title}</Text>
                <RadioGroup
                    itemMinHeight={38}
                    data={options}
                    getText={e => e.label}
                    onSelectedChanged={onSelect}
                />
            </View>
            {backButtonAction && startChatButtonAction ?
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity disabled={isSubmitting} style={styles.backButton} onPress={backButtonAction}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <CommonButton
                        disabled={!isValid || isSubmitting}
                        loading={isSubmitting}
                        style={{ width: 125, height: 40, }} type="information" title="Start a Chat" onPress={startChatButtonAction} />
                </View>
                : null}
        </View>
    </View>
}

type formikTypeValues = {
    'primary-goal': string,
    'topic-understanding': number,
}
const validationSchema = Yup.object().shape({
    'primary-goal': Yup.string().required(),
    'topic-understanding': Yup.number().required(),
});
type PreSessionQuestionScreenType = NativeStackScreenProps<MainStackParamList, 'PreSessionQuestionScreen'>;
export const PreSessionQuestionScreen: React.FC<PreSessionQuestionScreenType> = ({ navigation, route }) => {
    const formik = useFormik<formikTypeValues>({
        initialValues: {} as formikTypeValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            let sessionId;
            try {
                const payload: any = {};
                for (const key of Object.keys(values)) {
                    //@ts-ignore
                    payload[key] = { answer: values[key] }
                }
                sessionId = await sessionService.newSession(route.params.sessionType, route.params.sessionSubTopic);
                await sessionService.sendPreSesionFeedback(sessionId, payload);



                //check if user already determine if he want notifications or not.
                const hasPermissions = await messaging().hasPermission();
                if (hasPermissions === messaging.AuthorizationStatus.NOT_DETERMINED) {
                    navigation.navigate('NotificationScreen', { sessionId });
                } else {
                    navigation.navigate('Session', { sessionId, });
                }

            } catch (error) {
                const currentSession =  await sessionService.getCurrentSession();
                if (sessionId) {
                    if (currentSession && currentSession.sessionId === sessionId) {
                        navigation.navigate('Session', { sessionId, });
                    } else {
                        navigation.navigate('NotificationScreen', { sessionId });
                    }
                }
                console.log('error', error);
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const flatListRef = useRef<FlatList<QuestionType>>(null);
    return <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1, }}>
                <View style={{ paddingHorizontal: 20, }}>
                    <Separator backgroundColor={'transparent'} marginVertical={12} />
                    <H3>Tell us about your request</H3>
                    <HelperText color={Colors.secondaryGray} mt={16}>This info will help us find the best coach to pair you with.</HelperText>
                </View>
                <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
                    <Text style={styles.questionText}> Question {currentQuestionIndex + 1}/{preSessionFeedbackQuestions.length}</Text>
                    <View style={{ flex: 1 }}>
                        <ProgressBar color={Colors.success} value={currentQuestionIndex === 0 ? .5 : 1} />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    backgroundColor: Colors.selectedGreen
                }}>
                    <FlatList
                        ref={flatListRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        onMomentumScrollEnd={({ nativeEvent }) => {
                            let contentOffset = nativeEvent.contentOffset;
                            let viewSize = nativeEvent.layoutMeasurement;
                            let pageNum = Math.floor(contentOffset.x / viewSize.width);
                            setCurrentQuestionIndex(pageNum)
                        }}
                        keyExtractor={(item) => `pre_feedback_${item.key}`}
                        pagingEnabled
                        data={preSessionFeedbackQuestions}
                        renderItem={({ item, index }) => {
                            if (index === preSessionFeedbackQuestions.length - 1)
                                return <Question {...item}
                                    isValid={formik.isValid && !formik.isSubmitting}
                                    isSubmitting={formik.isSubmitting}
                                    onSelect={({ value }) => formik.setFieldValue(item.key, value)}
                                    backButtonAction={
                                        () => flatListRef.current?.scrollToIndex({ index: index - 1 })}
                                    startChatButtonAction={formik.handleSubmit}
                                />
                            return <Question {...item} isSubmitting={false} isValid={false} onSelect={({ value }) => {
                                formik.setFieldValue(item.key, value);
                                flatListRef.current?.scrollToIndex({ index: index + 1 })
                            }
                            } />
                        }
                        }
                    />

                </View>
            </View>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    body: {
        // flex: 1,
        backgroundColor: Colors.selectedGreen
    },
    questionTitle: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 18,
        color: Colors.softBlack,
        marginBottom: 24
    },
    questionText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 12,
        color: Colors.defaultGray,
        marginRight: 13,
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20,
        marginTop: 24,
    },
    backButton: {
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    backButtonText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
    },
    optionsCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 16,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    }
})
