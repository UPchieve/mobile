import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { messageUserType } from './ChatTypes'
import DotsLoader from '../../common/DotsLoader'

type ChatBubbleType = {
  text: string
  sentByMe: boolean
  userType: messageUserType
  isTypping?: boolean
}

export const ChatBubble: React.FC<ChatBubbleType> = ({
  text,
  sentByMe,
  userType,
  isTypping = false,
}) => {
  const getBackgroundColor = () => {
    if (sentByMe) {
      return Colors.backgroundBlue
    } else {
      return userType === 'chatbot'
        ? Colors.backgroundGreen
        : Colors.backgroundGray
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        isTypping && styles.dotsContainer,
      ]}
    >
      {isTypping ? (
        <View style={styles.dotsWrapper}>
          {/*@ts-ignore*/}
          <DotsLoader size={5} />
        </View>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    minHeight: 39,
  },
  text: {
    color: Colors.softBlack,
    fontSize: 16,
  },
  dotsContainer: {
    width: 50,
  },
  dotsWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
})
