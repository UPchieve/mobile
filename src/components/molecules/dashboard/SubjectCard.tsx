import React from 'react'
import { SubTopic, Topic } from '../../../interfaces/dashboardInterfaces'
import { Pressable, Image, View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { ModalSelect } from '../../atoms/common/ModalSelect'
import { SvgUri } from 'react-native-svg'

type SubjectType = {
  topic: Topic
  selectRef: React.RefObject<ModalSelect>
  onSelect: (topic: string, subTopic: string) => void
  isOpen: boolean
  onBeforeOpen: () => void
}
export const SubjectCard: React.FC<SubjectType> = ({
  topic,
  selectRef,
  onSelect,
  isOpen,
  onBeforeOpen,
}) => {
  return (
    <>
      <Pressable
        style={[styles.container, isOpen && styles.containerIsOpen]}
        onPress={() => {
          onBeforeOpen()
          selectRef.current?.open({
            data: topic.subTopics,
            onSelect: (e) => onSelect(topic.key, e.key),
            title: topic.displayName,
            getLabel: (e: SubTopic) => e.displayName,
          })
        }}
      >
        <SvgUri uri={topic.image} height={60} width={60} />
        <View style={styles.textContainer}>
          <Text style={styles.topicText}>{topic.displayName}</Text>
          <Text style={styles.amountOfSubjectsText}>
            {topic.subTopics.length} Subjects
          </Text>
        </View>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 88,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.borderGray,
    borderRadius: 8,
  },
  containerIsOpen: {
    borderColor: Colors.success,
    backgroundColor: Colors.selectedGreen,
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: 16,
    justifyContent: 'space-evenly',
  },
  topicText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 18,
    color: Colors.softBlack,
  },
  amountOfSubjectsText: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 14,
    color: Colors.secondaryGray,
  },
})
