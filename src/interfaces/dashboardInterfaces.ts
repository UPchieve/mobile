export interface SubTopic {
  key: string
  displayName: string
  order: number
}
export interface Topic {
  key: string
  displayName: string
  subTopics: SubTopic[]
  image: string
  order: number
}
