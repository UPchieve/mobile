import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { ChatBubble } from './ChatBubble'
import { messageUserType } from './ChatTypes'

type ChatMessageType = {
  text: string
  sentByMe: boolean
  time: Date
  userType: messageUserType
  lastMessage: boolean
}

const formatTime = (date: Date) =>
  date.toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

export const ChatMessage: React.FC<ChatMessageType> = ({
  sentByMe,
  text,
  time,
  userType,
  lastMessage,
}) => {
  const renderAvatar = () => {
    switch (userType) {
      case 'student':
        return (
          <Image
            source={{ uri: ImageIndex.avatars.student }}
            style={styles.icon}
          />
        )
      case 'volunteer':
        return (
          <Image
            source={{ uri: ImageIndex.avatars.volunteer }}
            style={styles.icon}
          />
        )
      case 'chatbot':
        return (
          <Image
            source={{ uri: ImageIndex.avatars.chatbot }}
            style={styles.icon}
          />
        )
      default:
        throw Error()
    }
  }

  return (
    <View
      style={[
        styles.container,
        { alignItems: !sentByMe ? 'flex-start' : 'flex-end' },
      ]}
    >
      <View>
        <ChatBubble sentByMe={sentByMe} text={text} userType={userType} />
        {!sentByMe && lastMessage ? renderAvatar() : null}
      </View>
      {lastMessage ? (
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 8 + 28,
  },
  icon: {
    height: 28,
    width: 28,
    position: 'absolute',
    bottom: 0,
    left: -8 - 28,
  },
  timeText: {
    fontSize: 14,
    color: Colors.secondaryGray,
    marginTop: 8,
  },
})
