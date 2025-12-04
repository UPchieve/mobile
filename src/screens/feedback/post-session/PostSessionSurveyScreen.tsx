import { FormikProvider, useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Question } from '../../../components/atoms/session-experience/Question'
import { SessionFeedbackHeader } from '../../../components/atoms/session-experience/SessionFeedbackHeader'
import { RateNumbers } from '../../../components/molecules/survey/RateNumbers'
import { RateStars } from '../../../components/molecules/survey/RateStars'
import { CommonButton } from '../../../components/common/CommonButton'
import { CommonTextArea } from '../../../components/common/CommonTextArea'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../../routes/MainStackNavigator'
import { QuestionPopover } from '../../../components/atoms/session-experience/QuestionPopover'
import { AuthContext } from '../../../providers/AuthProvider'
import { sessionService } from '../../../services/sessionService'
import {
  SurveyQueryResponse,
  SurveyQuestionDefinition,
  SurveyResponseDefinition,
  UserSurveySubmission,
} from '../../../types/services/surveyServiceTypes'
import _, { orderBy, map } from 'lodash'
import { SurveyRadioGroup } from '../../../components/molecules/survey/SurveyRadioGroup'
import { SurveyChipGroup } from '../../../components/molecules/survey/SurveyChipGroup'
import {
  submitSurvey,
  isFavoriteLimitReached,
  favoriteVolunteer,
} from '../../../services/surveyService'

interface FormQuestions {}
const initialValues: FormQuestions = {}

type PostSessionSurveyType = NativeStackScreenProps<
  MainStackParamList,
  'PostSessionSurvey'
>
export const PostSessionSurveyScreen: React.FC<PostSessionSurveyType> = ({
  navigation,
}) => {
  const authContext = useContext(AuthContext)
  const { sessionState } = authContext
  const [postSessionSurvey, setPostSessionSurvey] =
    useState<SurveyQueryResponse>()
  const [canFavoriteVolunteer, setCanFavoriteVolunteer] =
    useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (!postSessionSurvey) {
        const response = await sessionService.getPostsessionSurveyDefinition(
          sessionState?._id!
        )
        response.survey = orderBy(response.survey, (q) => q.displayPriority)
        setPostSessionSurvey(response)
      }
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      const favoriteLimitReached = await isFavoriteLimitReached()
      setCanFavoriteVolunteer(!favoriteLimitReached)
    })()
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    validate: (values) => {
      if (Object.keys(values).length > 0) {
        return {}
      }
      return {
        error: 'At least one question must be answer to submit the form.',
      }
    },
    onSubmit: async (values) => {
      const surveySubmissions = Object.keys(values).map((k) => {
        const responses = values[
          k as keyof FormQuestions
        ] as UserSurveySubmission
        return {
          questionId: parseInt(k),
          responseChoiceId: responses.responseChoiceId,
          openResponse: responses.openResponse,
        }
      })
      // the answer to the coach-favoriting question is not included in the feedback submission
      const favoritingQuestion = postSessionSurvey?.survey.find((q) =>
        isHighRatingQuestion(q)
      )
      let favoritedCoach = false
      if (favoritingQuestion) {
        const favoritingSubmission = _.remove(
          surveySubmissions,
          (resp) => resp.questionId.toString() === favoritingQuestion.questionId
        )
        if (!_.isEmpty(favoritingSubmission)) {
          const favoritingSubmissionResponse =
            favoritingQuestion.responses.find(
              (re) => re.responseId === favoritingSubmission[0].responseChoiceId
            )
          favoritedCoach =
            !!favoritingSubmissionResponse &&
            favoritingSubmissionResponse.responseText === 'Yes'
        }
      }

      // the answers to the what-went-wrong questions are multiselect; convert to several single-response answers for saving
      const sessionIssuesQuestion = postSessionSurvey?.survey.find((q) =>
        isLowRatingQuestion(q)
      )
      if (sessionIssuesQuestion) {
        const questionResponse = formik.values[
          sessionIssuesQuestion.questionId as keyof FormQuestions
        ] as UserSurveySubmission
        if (questionResponse) {
          const responsesList = questionResponse.openResponse
            .split(',')
            .filter((x) => x) // filter out empty string

          // remove the compressed response that isn't formatted right
          _.remove(
            surveySubmissions,
            (resp) =>
              resp.questionId.toString() === sessionIssuesQuestion.questionId
          )
          responsesList.forEach((resp) => {
            surveySubmissions.push({
              questionId: parseInt(sessionIssuesQuestion.questionId),
              responseChoiceId: parseInt(resp, 10),
              openResponse: '',
            })
          })
        }
      }
      // remove any unanswered questions from list
      _.remove(
        surveySubmissions,
        (resp) => !(resp.openResponse || resp.responseChoiceId)
      )
      try {
        await submitSurvey({
          surveyId: postSessionSurvey!.surveyId,
          surveyTypeId: postSessionSurvey!.surveyTypeId,
          sessionId: sessionState!._id,
          submissions: surveySubmissions,
        })
        if (favoritedCoach) {
          await favoriteVolunteer(
            sessionState!.volunteer!._id,
            sessionState!._id
          )
        }

        navigation.navigate('PostSessionSurveySuccess')
      } catch {
        alert('We had a problem submitting your feedback.')
      }
    },
  })

  const getQuestions = () => {
    if (!postSessionSurvey) {
      return []
    }
    const questionList = postSessionSurvey.survey
    let visibleQuestions = map(questionList, (q) => {
      const isVisible =
        !(isHighRatingQuestion(q) || isLowRatingQuestion(q)) ||
        (isLowRatingQuestion(q) && showLowRatingQuestion()) ||
        (isHighRatingQuestion(q) && showHighRatingQuestion())
      q.responses = orderBy(q.responses, (r) => r.responseDisplayPriority)
      return {
        questionId: q.questionId,
        question: q,
        isVisible,
        questionType: getQuestionDisplayType(q),
        headerText: getQuestionSectionHeader(q),
      }
    })
    visibleQuestions = orderBy(
      visibleQuestions,
      (q) => q.question.displayPriority
    ).filter((q) => q.isVisible)
    return visibleQuestions
  }

  const getQuestionSectionHeader = (question: SurveyQuestionDefinition) => {
    if (question.questionType === 'multiple choice') {
      if (isStarRankingQuestion(question)) {
        return 'Your Goal'
      } else if (isHowSupportiveQuestion(question)) {
        return 'Your Coach'
      }
    } else if (question.questionType === 'free response') {
      return 'Your Thoughts'
    }
    return undefined
  }

  const getQuestionDisplayType = (question: SurveyQuestionDefinition) => {
    if (question.questionType === 'multiple choice') {
      if (question.questionText.startsWith('How do you think')) {
        return 'emoji'
      } else if (isLowRatingQuestion(question)) {
        return 'chip'
      } else if (isStarRankingQuestion(question)) {
        return 'star'
      } else if (isHighRatingQuestion(question)) {
        return 'radio'
      } else if (isNumericalRatingQuestion(question)) {
        return 'number-rating'
      }
    }
    return question.questionType
  }
  const isStarRankingQuestion = (question: SurveyQuestionDefinition) => {
    return (
      question.questionText.startsWith('Your goal for this session') ||
      question.questionText.endsWith('achieve their goal?')
    )
  }
  const getStarRankingResponse = (): SurveyResponseDefinition | undefined => {
    const question = postSessionSurvey?.survey.find((q) =>
      isStarRankingQuestion(q)
    )
    if (!question) {
      return
    }
    const responseSubmission = formik.values[
      question.questionId as keyof FormQuestions
    ] as UserSurveySubmission
    return question.responses.find(
      (resp) => resp.responseId === responseSubmission?.responseChoiceId
    )
  }
  const isNumericalRatingQuestion = (question: SurveyQuestionDefinition) => {
    return (
      isHowSupportiveQuestion(question) ||
      question.questionText.startsWith('Overall, how much did your coach')
    )
  }
  const isHowSupportiveQuestion = (question: SurveyQuestionDefinition) => {
    return question.questionText.startsWith('Overall, how supportive')
  }
  const isHighRatingQuestion = (question: SurveyQuestionDefinition) => {
    return question.questionText.startsWith(
      'Would you like to favorite your coach'
    )
  }
  const showHighRatingQuestion = () => {
    if (!canFavoriteVolunteer) {
      return false
    }
    const ratingResponse = getStarRankingResponse()
    return (
      ratingResponse &&
      (ratingResponse.responseText === "I'm def closer to my goal" ||
        ratingResponse.responseText === 'GOAL ACHIEVED')
    )
  }
  const isLowRatingQuestion = (question: SurveyQuestionDefinition) => {
    return question.questionText.startsWith('Sorry to hear that')
  }
  const showLowRatingQuestion = () => {
    const ratingResponse = getStarRankingResponse()
    return (
      ratingResponse &&
      (ratingResponse.responseText === 'Not at all' ||
        ratingResponse.responseText === 'Sorta but not really')
    )
  }

  const getAnswerToMultipleChoiceQuestion = (
    question: SurveyQuestionDefinition
  ) => {
    // this is a mess, but it's the easiest way to access form value properties that are dynamic
    const questionResponse = formik.values[
      question.questionId as keyof FormQuestions
    ] as UserSurveySubmission
    if (!questionResponse) {
      return
    }
    const selectedResponse = question.responses.find(
      (r) => r.responseId === questionResponse.responseChoiceId
    )
    return selectedResponse?.responseText
  }

  const handleSingleSelected = (
    questionId: string,
    responseChoiceId?: number
  ) => {
    formik.setFieldValue(questionId, {
      responseChoiceId,
      openResponse: '',
    })
    // if question changed is ratings question, clear out conditional question stored values that are hidden
    const currentQuestion = postSessionSurvey?.survey.find(
      (q) => q.questionId === questionId
    )
    if (currentQuestion && isStarRankingQuestion(currentQuestion)) {
      if (!showHighRatingQuestion()) {
        const highRatingsQuestion = postSessionSurvey?.survey.find((q) =>
          isHighRatingQuestion(q)
        )
        if (highRatingsQuestion) {
          formik.setFieldValue(highRatingsQuestion.questionId, {
            responseChoiceId: '',
            openResponse: '',
          })
        }
      }
      if (!showLowRatingQuestion()) {
        const lowRatingsQuestion = postSessionSurvey?.survey.find((q) =>
          isLowRatingQuestion(q)
        )
        if (lowRatingsQuestion) {
          formik.setFieldValue(lowRatingsQuestion.questionId, {
            responseChoiceId: '',
            openResponse: '',
          })
        }
      }
    }
  }

  const handleTextAreaResponse = (questionId: string, openResponse: string) => {
    // there's only one "response choice" associated with open responses, need it present so the answer can be saved properly
    const currentQuestion = postSessionSurvey?.survey.find(
      (q) => q.questionId === questionId
    )
    const responseChoiceId = currentQuestion?.responses[0].responseId
    formik.setFieldValue(questionId, {
      responseChoiceId,
      openResponse,
    })
  }

  // since things are more strongly typed here than in the webapp, store multiselect responses in OpenResponse and then process them out on save
  const handleMultiselect = (questionId: string, responseChoiceId: number) => {
    const currentSelected = formik.values[
      questionId as keyof FormQuestions
    ] as UserSurveySubmission
    if (!currentSelected) {
      // list is currently empty, create it
      formik.setFieldValue(questionId, {
        openResponse: responseChoiceId.toString(),
      })
    }
    const alreadySelectedValues = currentSelected.openResponse?.split(',') || []

    if (alreadySelectedValues.find((r) => r === responseChoiceId.toString())) {
      // clicked item is already in list, deselect it
      _.remove(alreadySelectedValues, (r) => r === responseChoiceId.toString())
    } else {
      // clicked item not in list yet, select it
      alreadySelectedValues.push(responseChoiceId.toString())
    }

    formik.setFieldValue(questionId, {
      responseChoiceId: '',
      openResponse: alreadySelectedValues.toString(),
    })
  }

  return (
    <SafeAreaView>
      {/*TODO Icon in the right must navigate to dashboard*/}
      <SessionFeedbackHeader
        onIconPress={() =>
          navigation.reset({ routes: [{ name: 'DashboardScreen' }] })
        }
        iconAccessibilityLabel={'Return to Dashboard'}
      />
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        extraScrollHeight={110}
        enableAutomaticScroll={true}
        extraHeight={110}
        enableOnAndroid={true}
        style={{
          paddingLeft: 23,
          paddingRight: 23,
        }}
      >
        <FormikProvider value={formik}>
          {getQuestions().map((questionInfo) => {
            return (
              <View
                style={styles.questionWrapper}
                key={questionInfo.questionId}
              >
                {questionInfo.headerText && (
                  <Text style={styles.sectionHeader}>
                    {questionInfo.headerText}
                    {questionInfo.questionType === 'free response' && (
                      <QuestionPopover textPopover="We read every single comment, but if you need to connect with UPchieve staff about a question or concern please email us directly: support@upchieve.org" />
                    )}
                  </Text>
                )}
                <Question
                  text={questionInfo.question.questionText}
                  informationText={
                    questionInfo.questionType === 'radio'
                      ? 'Favoriting a coach will increase your chances of being paired with them in the future.'
                      : undefined
                  }
                />
                {questionInfo.questionType === 'star' && (
                  <>
                    <RateStars
                      data={questionInfo.question.responses}
                      onSelectedChanged={(
                        selected: SurveyResponseDefinition
                      ) => {
                        return handleSingleSelected(
                          questionInfo.questionId,
                          selected.responseId
                        )
                      }}
                    />
                    <Text style={styles.goalLabel}>
                      {getAnswerToMultipleChoiceQuestion(questionInfo.question)}
                    </Text>
                  </>
                )}
                {questionInfo.questionType === 'number-rating' && (
                  <>
                    <RateNumbers
                      data={questionInfo.question.responses}
                      onSelectedChanged={(
                        selected: SurveyResponseDefinition
                      ) => {
                        return handleSingleSelected(
                          questionInfo.questionId,
                          selected.responseId
                        )
                      }}
                    />
                    <Text style={styles.goalLabel}>
                      {getAnswerToMultipleChoiceQuestion(questionInfo.question)}
                    </Text>
                  </>
                )}
                {questionInfo.questionType === 'radio' && (
                  <>
                    <SurveyRadioGroup
                      itemMinHeight={38}
                      data={questionInfo.question.responses}
                      getText={(res) => res.responseText}
                      onSelectedChanged={(selected) =>
                        handleSingleSelected(
                          questionInfo.questionId,
                          selected.responseId
                        )
                      }
                    />
                  </>
                )}
                {questionInfo.questionType === 'chip' && (
                  <SurveyChipGroup
                    data={questionInfo.question.responses}
                    onSelectedChanged={(selected) =>
                      handleMultiselect(
                        questionInfo.questionId,
                        selected.responseId
                      )
                    }
                  />
                )}
                {questionInfo.questionType === 'free response' && (
                  <CommonTextArea
                    onChangeText={(selected) =>
                      handleTextAreaResponse(questionInfo.questionId, selected)
                    }
                  />
                )}
              </View>
            )
          })}
          <View style={styles.buttonWrapper}>
            <CommonButton
              title={'Submit'}
              disabled={!formik.isValid}
              onPress={formik.handleSubmit}
              type={'information'}
              style={{ width: 89, height: 40 }}
            />
          </View>
        </FormikProvider>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  questionWrapper: {
    marginBottom: 36,
    marginTop: 24,
  },
  buttonWrapper: {
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  goalLabel: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 12,
  },
})
