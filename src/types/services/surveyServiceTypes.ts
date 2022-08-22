export type SurveyResponseDefinition = {
  responseId: number
  responseText: string
  responseDisplayPriority: number
  responseDisplayImage: string | undefined
}

export type SurveyQuestionDefinition = {
  questionId: string
  questionText: string
  displayPriority: number
  questionType: String
  responses: SurveyResponseDefinition[]
}

export type SurveyQueryResponse = {
  surveyId: number
  surveyTypeId: number
  survey: SurveyQuestionDefinition[]
}

export type UserSurveySubmission = {
  questionId: number
  responseChoiceId: number
  openResponse: string
}

export type SubmitSurvey = {
  surveyId: number
  surveyTypeId: number
  sessionId: string
  submissions: UserSurveySubmission[]
}
