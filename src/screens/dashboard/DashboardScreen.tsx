import { DrawerScreenProps } from '@react-navigation/drawer'
import { useFocusEffect } from '@react-navigation/native'
import React, { useContext, useRef, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../../assets/Colors'
import { FontIndex } from '../../../assets/FontIndex'
import { ImageIndex } from '../../../assets/ImageIndex'
import { ModalSelect } from '../../components/atoms/common/ModalSelect'
import { FullScreenSessionState } from '../../components/molecules/dashboard/FullScreenSessionState'
import { SubjectCard } from '../../components/molecules/dashboard/SubjectCard'
import { Topic } from '../../interfaces/dashboardInterfaces'
import { AuthContext } from '../../providers/AuthProvider'
import { MainStackParamList } from '../../routes/MainStackNavigator'
import { getSubjects } from '../../services/subjectsService'
import { AllSubjectsWithTopics } from '../../types/services/subjectsServiceTypes'
import { backOff } from 'exponential-backoff'
import { LoadingOverlay } from '../../components/molecules/common/LoadingOverlay'
import crashlytics from '@react-native-firebase/crashlytics'
import { captureEvent } from '../../services/analyticsService'
import { EVENTS } from '../../types/services/analyticsServiceTypes'

type DashboardScreenType = DrawerScreenProps<
  MainStackParamList,
  'DashboardScreen'
>

const SCREEN_HEIGHT = Dimensions.get('screen').height
export const DashboardScreen: React.FC<DashboardScreenType> = ({
  navigation,
}) => {
  const { user, userState } = useContext(AuthContext)
  const [subjectOpened, setSubjectOpened] = useState<number>()
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(false)

  const insets = useSafeAreaInsets()
  const modalizeRef = useRef<Modalize>(null)
  const selectRef = useRef<ModalSelect>(null)

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        userState.refreshUserState()
      })()
    }, [])
  )

  const processSubjects = (subjects: AllSubjectsWithTopics) => {
    const topicMapping = {} as { [topicName: string]: Topic }
    for (const subject of Object.values(subjects)) {
      const { topicName } = subject
      if (!subject.active) continue
      if (!topicMapping[topicName])
        topicMapping[topicName] = {
          key: subject.topicName,
          displayName: subject.topicDisplayName,
          image: subject.topicIconLink ? subject.topicIconLink : '',
          order: subject.topicDashboardOrder,
          subTopics: [],
        }
      topicMapping[topicName].subTopics.push({
        key: subject.name,
        displayName: subject.displayName,
        order: subject.displayOrder,
      })
    }

    const dashboardTopics = Object.values(topicMapping)
    dashboardTopics.sort((a, b) => a.order - b.order)
    for (const topic of dashboardTopics) {
      topic.subTopics.sort((a, b) => a.order - b.order)
    }

    setTopics(dashboardTopics)
  }

  useEffect(() => {
    const getDashboardSubjects = async () => {
      try {
        setIsLoadingSubjects(true)
        const subjects = await backOff(() => getSubjects())
        processSubjects(subjects)
      } catch (error: any) {
        crashlytics().log('Unable to load subjects to the dashboard.')
        crashlytics().recordError(error)
        alert('Unable to load subjects to the dashboard.')
      } finally {
        setIsLoadingSubjects(false)
      }
    }
    getDashboardSubjects()

    captureEvent(EVENTS.USER_LANDED_ON_DASHBOARD, {
      $set: {
        mobileVersion: '2.9.18',
      },
    })
  }, [])

  const calculateSnapPoint = () => {
    let height = SCREEN_HEIGHT - 300 - 10
    if (Platform.OS === 'ios') {
      height = height + insets.top + insets.bottom
    } else {
      height += 60
    }
    return height
  }

  const onSessionSelected = (topic: string, subTopic: string) => {
    navigation.navigate('PreSessionQuestionScreen', {
      sessionType: topic,
      sessionSubTopic: subTopic,
    })
  }

  if (userState.userState !== undefined) {
    return (
      <FullScreenSessionState
        navigation={navigation}
        topInsets={insets.top}
        {...userState}
      />
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImageIndex.dashboard.background}
        style={[styles.headerBackground]}
        onLayout={({ nativeEvent }) => console.log(nativeEvent.layout.height)}
      >
        <View style={styles.header}>
          <Text style={styles.helloText}>Hello, {user?.firstname}</Text>
          <Text
            style={[
              styles.helloText,
              {
                fontSize: 16,
                fontFamily: FontIndex.WorkSans.Regular,
                lineHeight: 21,
              },
            ]}
          >
            What can we help you with?
          </Text>
        </View>
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Open Menu"
          style={[styles.buttonImage, { top: insets.top }]}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            source={ImageIndex.dashboard.openMenuButton}
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      </ImageBackground>
      {isLoadingSubjects ? (
        <LoadingOverlay />
      ) : (
        <Modalize
          ref={modalizeRef}
          panGestureComponentEnabled
          alwaysOpen={calculateSnapPoint()}
          snapPoint={SCREEN_HEIGHT - 200}
          HeaderComponent={
            <View style={{ marginTop: 30 }}>
              <Text style={styles.chooseText}>
                Choose a subject to get help with:
              </Text>
            </View>
          }
          modalStyle={{ paddingHorizontal: 20 }}
          handleStyle={{ top: 27, backgroundColor: Colors.borderGray }}
          withOverlay={false}
          flatListProps={{
            data: topics,
            renderItem: ({ item, index }) => (
              <SubjectCard
                topic={item}
                selectRef={selectRef}
                onBeforeOpen={() => setSubjectOpened(index)}
                onSelect={onSessionSelected}
                isOpen={index === subjectOpened}
              />
            ),
            keyExtractor: (item) => `dashboardSubjectList_${item.key}`,
            ItemSeparatorComponent: () => (
              <View style={{ marginVertical: 8 }} />
            ),
            showsVerticalScrollIndicator: false,
          }}
        />
      )}
      <ModalSelect
        ref={selectRef}
        onClose={() => setSubjectOpened(undefined)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  helloText: {
    fontFamily: FontIndex.WorkSans.Medium,
    color: Colors.softBlack,
    fontSize: 22,
    lineHeight: 33,
  },
  headerBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
  },
  header: {
    paddingLeft: 20,
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  chooseText: {
    color: Colors.secondaryGray,
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 14,
    marginBottom: 16,
  },
  buttonImage: {
    position: 'absolute',
    right: 20,
    top: 0,
  },
})
