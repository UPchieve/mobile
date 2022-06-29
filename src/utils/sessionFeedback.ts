export type QuestionType = {
  title: string
  key: string
  options: SelectItem[]
}
export const preSessionFeedbackQuestions: QuestionType[] = [
  {
    key: 'primary-goal',
    title: 'What is your primary goal for today’s session?',
    options: [
      {
        label: 'Solve a specific question.',
        value: 'specific-question',
      },
      {
        label: 'Complete a homework assignment.',
        value: 'complete-homework',
      },
      {
        label: 'Prepare for a quiz/test.',
        value: 'test-prep',
      },
      {
        label: 'Check my answers.',
        value: 'check-answers.',
      },
      {
        label: 'Improve my understanding of a topic.',
        value: 'improve-understanding',
      },
      {
        label: 'Other',
        value: 'other',
      },
    ],
  },
  {
    key: 'topic-understanding',
    title:
      'What is your level of understanding of the topic you need support with?',
    options: [
      {
        label: "I don't know how to do this at all.",
        value: 1,
      },
      {
        label: 'I think I know how to do it, but I need help.',
        value: 2,
      },
      {
        label: "I can do this on my own, but I don't fully understand it.",
        value: 3,
      },
      {
        label: 'I am very comfortable with this topic.',
        value: 4,
      },
    ],
  },
]
