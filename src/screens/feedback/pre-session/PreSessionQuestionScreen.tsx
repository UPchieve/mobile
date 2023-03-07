import React, { useRef, useState, useEffect } from 'react'
import {
  useWindowDimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { H3 } from '../../../components/atoms/common/H3'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { Colors } from '../../../../assets/Colors'
import { Separator } from '../../../components/atoms/common/Separator'
import { FontIndex } from '../../../../assets/FontIndex'
import { ProgressBar } from '../../../components/atoms/common/ProgressBar'
import { SurveyRadioGroup } from '../../../components/molecules/survey/SurveyRadioGroup'
import { CommonButton } from '../../../components/common/CommonButton'
import { useFormik } from 'formik'
import { sessionService } from '../../../services/sessionService'
import * as surveyService from '../../../services/surveyService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../../routes/MainStackNavigator'
import messaging from '@react-native-firebase/messaging'
import {
  SurveyQuestionDefinition,
  SurveyResponseDefinition,
  UserSurveySubmission,
} from '../../../types/services/surveyServiceTypes'
import { SurveyEmojiGroup } from '../../../components/molecules/survey/SurveyEmojiGroup'
import { config } from '../../../../config'

export type SelectPresessionItem = Pick<
  SurveyResponseDefinition,
  'responseId' | 'responseText'
>

type QuestionFCType = {
  onBackButtonPress: () => void
  onSubmit: () => void
  isValid: boolean
  isSubmitting: boolean
  currentStep: number
  totalSteps: number
  onSelect: (value: SelectPresessionItem) => void
} & SurveyQuestionDefinition

const Question: React.FC<QuestionFCType> = ({
  questionText,
  questionType,
  responses,
  onSelect,
  onBackButtonPress,
  onSubmit,
  isValid,
  isSubmitting,
  totalSteps,
  currentStep,
}) => {
  const { width, height } = useWindowDimensions()
  return (
    <View style={{ marginTop: 16, width: width < height ? width : height }}>
      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.optionsCard}>
          <Text style={styles.questionTitle}>{questionText}</Text>
          {responses.every((a) => a.responseDisplayImage) ? (
            <SurveyEmojiGroup
              data={responses}
              getText={(e) => e.responseText}
              isSelected={(selected, compareTo) =>
                selected?.responseId === compareTo.responseId
              }
              getImageSrc={(e) => {
                let imageSrc = ''
                if (config.baseUrl.includes('localhost'))
                  imageSrc = e.responseDisplayImage?.replace(
                    'https',
                    'http'
                  ) as string
                else imageSrc = e.responseDisplayImage as string
                return imageSrc
              }}
              onSelectedChanged={onSelect}
            />
          ) : questionType === 'multiple choice' ? (
            <SurveyRadioGroup
              itemMinHeight={38}
              data={responses}
              getText={(e) => e.responseText}
              onSelectedChanged={onSelect}
            />
          ) : null}
        </View>
        <View style={styles.buttonWrapper}>
          {currentStep > 0 && (
            <TouchableOpacity
              disabled={isSubmitting}
              style={styles.backButton}
              onPress={onBackButtonPress}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep === totalSteps && (
            <CommonButton
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              style={{ width: 125, height: 40 }}
              type="information"
              title="Start a Chat"
              onPress={onSubmit}
            />
          )}
        </View>
      </View>
    </View>
  )
}

type surveyResponse = {
  responseId: number
  openResponse: string
}

type formikTypeValues = {
  [questionId: number]: surveyResponse
}
type PreSessionQuestionScreenType = NativeStackScreenProps<
  MainStackParamList,
  'PreSessionQuestionScreen'
>
export const PreSessionQuestionScreen: React.FC<
  PreSessionQuestionScreenType
> = ({ navigation, route }) => {
  const subjectName = route.params.sessionSubTopic
  const [survey, setSurvey] = useState<SurveyQuestionDefinition[]>([])
  const [surveyId, setSurveyId] = useState<number>()
  const [surveyTypeId, setSurveyTypeId] = useState<number>()

  const isSurveyComplete = (values: formikTypeValues) => {
    for (const question of survey) {
      const questionId = Number(question.questionId)
      const userResponse = values[questionId]
      if (!userResponse || !userResponse.responseId) return false
    }
    return true
  }

  const formik = useFormik<formikTypeValues>({
    initialValues: {} as formikTypeValues,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!isSurveyComplete(values)) return

        const submissions: UserSurveySubmission[] = []
        for (const question of survey) {
          const questionId = Number(question.questionId)
          const response = values[questionId]
          submissions.push({
            questionId: Number(questionId),
            responseChoiceId: response.responseId,
            openResponse: response.openResponse,
          })
        }
        const sessionId = await sessionService.newSession(
          route.params.sessionType,
          subjectName
        )
        const surveySubmission = {
          sessionId,
          surveyId: surveyId as number,
          surveyTypeId: surveyTypeId as number,
          submissions,
        }
        await surveyService.submitSurvey(surveySubmission)

        //check if user already determine if he want notifications or not.
        const hasPermissions = await messaging().hasPermission()
        if (hasPermissions === messaging.AuthorizationStatus.NOT_DETERMINED) {
          navigation.navigate('NotificationScreen', { sessionId })
        } else {
          navigation.navigate('Session', { sessionId })
        }
      } catch (error) {
        const currentSession = await sessionService.getCurrentSession()
        if (currentSession) {
          navigation.navigate('Session', {
            sessionId: currentSession.sessionId,
          })
        } else {
          navigation.navigate('DashboardScreen')
        }
        console.log('error', error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const flatListRef = useRef<FlatList<SurveyQuestionDefinition>>(null)

  useEffect(() => {
    const getPresessionSurvey = async () => {
      const response = await surveyService.getPresessionSurvey(subjectName)
      setSurvey(response.survey)
      setSurveyId(response.surveyId)
      setSurveyTypeId(response.surveyTypeId)
    }

    getPresessionSurvey()
  }, [])

  const isSubmitting = formik.isSubmitting

  const scrollRef = useRef<ScrollView>(null)
  const scrollToTopOfView = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Separator backgroundColor={'transparent'} marginVertical={12} />
            <H3>Tell us about your request</H3>
            <HelperText color={Colors.secondaryGray} mt={16}>
              This info will help us find the best coach to pair you with.
            </HelperText>
          </View>
          <View
            style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}
          >
            <Text style={styles.questionText}>
              {' '}
              Question {currentQuestionIndex + 1}/{survey.length}
            </Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                color={Colors.success}
                // For some reason there is a bug that will not compute the initial value
                // e.g. using `value={(currentQuestionIndex + 1) / survey.length}` does not
                // render an initial width for the progress bar. Setting it directly helps
                // but this is not very scalable.
                // TODO: figure out how to fix this
                value={
                  currentQuestionIndex === 0
                    ? 0.33
                    : (currentQuestionIndex + 1) / survey.length
                }
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: Colors.selectedGreen,
            }}
          >
            <FlatList
              ref={flatListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={(item) => `pre_feedback_${item.questionId}`}
              pagingEnabled
              data={survey}
              renderItem={({ item, index }) => {
                return (
                  <Question
                    {...item}
                    isSubmitting={isSubmitting}
                    isValid={isSurveyComplete(formik.values) && !isSubmitting}
                    onBackButtonPress={() => {
                      scrollToTopOfView()
                      flatListRef.current?.scrollToIndex({ index: index - 1 })
                      setCurrentQuestionIndex(index - 1)
                    }}
                    onSubmit={formik.handleSubmit}
                    currentStep={index}
                    totalSteps={survey.length - 1}
                    onSelect={({ responseId }) => {
                      formik.setFieldValue(item.questionId, {
                        responseId,
                        openResponse: '',
                      })
                      scrollToTopOfView()
                      if (index < survey.length - 1) {
                        setCurrentQuestionIndex(index + 1)
                        flatListRef.current?.scrollToIndex({
                          index: index + 1,
                        })
                      }
                    }}
                  />
                )
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    backgroundColor: Colors.selectedGreen,
  },
  questionTitle: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 18,
    color: Colors.softBlack,
    marginBottom: 24,
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
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backButton: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
})
