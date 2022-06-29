import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontIndex } from '../../../../assets/FontIndex'
import { Colors } from '../../../../assets/Colors'
import { Popover, usePopover } from 'react-native-modal-popover'

interface QuestionType {
  text: string
  additionalText?: string
  textPopover: string
}

export const QuestionPopover: React.FC<QuestionType> = ({
  text,
  additionalText = null,
  textPopover,
}) => {
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover()

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <Text style={styles.questionText}>{text}</Text>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 10 }}>
          <TouchableOpacity
            style={styles.informationIcon}
            onPress={() => openPopover()}
            ref={touchableRef}
          >
            <Text style={styles.informationIconText}>i</Text>
          </TouchableOpacity>
        </View>
      </View>
      {additionalText ? (
        <View style={{ paddingBottom: 17 }}>
          <Text style={styles.mutedText}>{additionalText}</Text>
        </View>
      ) : null}
      <Popover
        contentStyle={styles.content}
        backgroundStyle={styles.background}
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        placement="top"
        supportedOrientations={['portrait']}
      >
        <Text style={styles.popoverText}>{textPopover}</Text>
      </Popover>
    </View>
  )
}
const styles = StyleSheet.create({
  questionText: {
    fontSize: 16,
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.softBlack,
    flexShrink: 1,
  },
  informationIcon: {
    borderColor: Colors.defaultGray,
    borderWidth: 1,
    borderRadius: 100,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationIconText: {
    color: Colors.defaultGray,
    fontSize: 12,
    fontFamily: FontIndex.WorkSans.Regular,
  },
  mutedText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.defaultGray,
    flexShrink: 1,
  },
  content: {
    paddingBottom: 14,
    paddingTop: 14,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    width: 250,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  popoverText: {
    color: Colors.secondaryGray,
    fontSize: 12,
    fontFamily: FontIndex.WorkSans.Regular,
  },
})
