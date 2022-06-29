import { ImageSourcePropType } from 'react-native'

export interface SubTopic {
  key: string
  displayName: string
}
export interface Topic {
  key: string
  displayName: string
  subTopics: SubTopic[]
  image: ImageSourcePropType
}
