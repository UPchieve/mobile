import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontIndex } from '../../../../assets/FontIndex'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { CommonButton } from '../../common/CommonButton'
import { SvgIcons } from '../../../../assets/IndexIcons'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { MainStackParamList } from '../../../routes/MainStackNavigator'
import { Colors } from '../../../../assets/Colors'
import { useUserStateType } from '../../../hooks/useUserState'
import Countdown from 'react-countdown'

type FullScreenSessionStateType = {
  navigation: DrawerNavigationProp<MainStackParamList, 'DashboardScreen'>
  topInsets: number
} & useUserStateType

export const FullScreenSessionState: React.FC<FullScreenSessionStateType> = ({
  topInsets,
  navigation,
  userState,
  currentSessionId,
  lastSessionDate,
  refreshUserState,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const renderContent = () => {
    switch (userState) {
      case 'banned':
        return renderBanned()
      case 'in_session':
        return renderInSession()
      case 'waiting':
        return renderWaiting()
    }
  }

  const renderInSession = () => {
    return (
      <React.Fragment>
        <LinearGradient
          colors={['rgba(176, 236, 223, 0.5)', 'rgba(255, 255, 255, 0)']}
          style={styles.background}
        />
        <View style={styles.container}>
          <Text style={styles.title}>You are currently in a session.</Text>
          <Image
            source={{ uri: ImageIndex.dashboard.state.inSession }}
            style={{ marginTop: 24, width: 242, height: 253 }}
          />
          <View style={{ paddingTop: 24, width: '100%' }}>
            <CommonButton
              title="Rejoin Session"
              type="information"
              loading={loading}
              onPress={async () => {
                try {
                  setLoading(true)
                  const state = await refreshUserState()
                  if (state === 'in_session') {
                    navigation.navigate('Session', {
                      sessionId: currentSessionId!,
                    })
                  }
                } finally {
                  setLoading(false)
                }
              }}
              SvgIcon={SvgIcons.GoArrow}
              style={{ width: '100%', height: 40 }}
            />
          </View>
        </View>
      </React.Fragment>
    )
  }

  const renderWaiting = () => {
    return (
      <React.Fragment>
        <LinearGradient
          colors={['rgba(249, 242, 220, 0.75)', 'rgba(251, 248, 238, 0)']}
          style={styles.background}
        />
        <View style={[styles.container, { paddingHorizontal: 40 }]}>
          <Countdown
            date={new Date(lastSessionDate!.getTime() + 5 * 60000)}
            autoStart
            onComplete={() => refreshUserState()}
            renderer={({ minutes, seconds }) => {
              return (
                <Text style={[styles.title, { fontSize: 48 }]}>
                  {minutes.toString().padStart(2, '0')}:
                  {seconds.toString().padStart(2, '0')}
                </Text>
              )
            }}
          />
          <Image
            source={{ uri: ImageIndex.dashboard.state.Waiting }}
            style={{ marginVertical: 24, width: 242, height: 253 }}
          />
          <Text style={styles.additionalText}>
            You must wait at least 5 minutes before requesting a new session.
          </Text>
        </View>
      </React.Fragment>
    )
  }

  const renderBanned = () => {
    return (
      <React.Fragment>
        <LinearGradient
          colors={['rgba(214, 225, 247, 0.5)', 'rgba(226, 232, 246, 0)']}
          style={styles.background}
        />
        <View style={[styles.container]}>
          <Text style={[styles.title]}>Your account is under review</Text>
          <Image
            source={{ uri: ImageIndex.dashboard.state.Banned }}
            style={{ marginVertical: 24 }}
          />
          <TouchableOpacity>
            <Text
              style={[styles.additionalText, { color: Colors.information }]}
            >
              Why am I seeing this?
            </Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    )
  }

  if (!userState) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.buttonImage, { top: topInsets }]}
        onPress={() => navigation.openDrawer()}
      >
        <Image
          source={{ uri: ImageIndex.dashboard.openMenuButton }}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>
      {renderContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 100,
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.softBlack,
  },
  imageStyle: {
    marginVertical: 24,
  },
  buttonImage: {
    position: 'absolute',
    right: 20,
    zIndex: 2,
  },
  additionalText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 16,
    color: Colors.softBlack,
  },
})
