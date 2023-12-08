import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { Popover, usePopover } from 'react-native-modal-popover'

interface QuestionType {
  text: string
  highlight?: string
  additionalText?: string
  informationText?: string
}
export const Question: React.FC<QuestionType> = ({
  text,
  highlight,
  additionalText,
  informationText,
}) => {
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover()

  const [showClosePopoverButton, setShowClosePopoverButton] = useState(false)

  async function openAccessiblePopover() {
    setShowClosePopoverButton(await AccessibilityInfo.isScreenReaderEnabled())
    openPopover()
    if (informationText) {
      AccessibilityInfo.announceForAccessibility(informationText)
    }
  }

  const getText = () => {
    if (highlight) {
      const startIndex = text.indexOf(highlight)
      const endIndex = text.indexOf(highlight) + highlight.length
      return (
        <Text style={styles.text}>
          {text.substring(0, startIndex)}
          <Text style={styles.highlightedText}>
            {text.substring(startIndex, endIndex)}
          </Text>
          {text.substring(endIndex, text.length)}
        </Text>
      )
    } else {
      return <Text style={styles.text}>{text}</Text>
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={{ flexGrow: 1, flex: 1 }}>
          <Text>{getText()}</Text>
        </View>
        {informationText ? (
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              accessible={true}
              accessibilityRole={'button'}
              accessibilityLabel={'More Info'}
              style={styles.informationIcon}
              onPress={() => openAccessiblePopover()}
              ref={touchableRef}
            >
              <Text style={styles.informationIconText}>i</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {additionalText ? (
        <Text style={styles.mutedText}>{additionalText}</Text>
      ) : null}
      {informationText ? (
        <Popover
          contentStyle={styles.content}
          backgroundStyle={styles.background}
          visible={popoverVisible}
          onClose={closePopover}
          fromRect={popoverAnchorRect}
          placement="top"
          supportedOrientations={['portrait']}
        >
          <Text style={styles.popoverText}>{informationText}</Text>
          {showClosePopoverButton && (
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              onPress={closePopover}
            >
              <Text style={styles.popoverText}>Return to Survey</Text>
            </TouchableOpacity>
          )}
        </Popover>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.softBlack,
    flexShrink: 1,
  },
  highlightedText: {
    color: Colors.success,
  },
  mutedText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.defaultGray,
    flexShrink: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  //popover
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
