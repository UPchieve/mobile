import React, { useState } from 'react'
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontIndex } from '../../../../assets/FontIndex'
import { Colors } from '../../../../assets/Colors'
import { Popover, usePopover } from 'react-native-modal-popover'

interface QuestionType {
  textPopover: string
}

export const QuestionPopover: React.FC<QuestionType> = ({ textPopover }) => {
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
    if (textPopover) {
      AccessibilityInfo.announceForAccessibility(textPopover)
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginLeft: 10,
            marginBottom: -10,
          }}
        >
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
      </View>
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
    </View>
  )
}
const styles = StyleSheet.create({
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
