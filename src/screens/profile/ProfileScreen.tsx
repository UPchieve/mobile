import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack'
import { Colors } from '../../../assets/Colors'
import { FontIndex } from '../../../assets/FontIndex'
import { ImageIndex } from '../../../assets/ImageIndex'
import { AuthContext } from '../../providers/AuthProvider'
import { DrawerParamList } from '../../routes/DrawerNavigator'
import { ProfileParamList } from '../../routes/ProfileStackNavigator'

// type ProfileScreenType = DrawerScreenProps<DrawerParamList, 'Profile'>;
type ProfileScreenType = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Profile'>,
  NativeStackScreenProps<ProfileParamList, 'ProfileIndex'>
>
export const ProfileScreen: React.FC<ProfileScreenType> = ({ navigation }) => {
  const user = useContext(AuthContext).user!

  const renderInfoItem = (field: string, value: string) => {
    return (
      <React.Fragment>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemField}>{field}</Text>
          <Text style={styles.infoItemValue}>{value}</Text>
        </View>
      </React.Fragment>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={ImageIndex.dashboard.openMenuButton}
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.avatarWrapper}>
          <Image source={ImageIndex.avatars.student} style={styles.avatar} />
          <Text style={styles.userNameText}>{user.firstname}</Text>
          <Text style={[styles.userTypeText, { marginTop: 3 }]}>Student</Text>
        </View>
        <View>
          {renderInfoItem('High School', 'Fairfax Senior High School')}
          <View
            style={{
              height: 1,
              backgroundColor: Colors.borderGray,
              width: '70%',
              alignSelf: 'flex-end',
            }}
          />
          {renderInfoItem('Grade', '11th Grade')}
          <View
            style={{
              height: 1,
              backgroundColor: Colors.borderGray,
              width: '70%',
              alignSelf: 'flex-end',
            }}
          />
          {renderInfoItem('Email', user.email)}
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.borderGray,
          marginTop: 10,
          marginBottom: 16,
        }}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.accountText}>Account</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Settings')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.backgroundGray : 'white',
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
          }}
        >
          <Text style={styles.settingsText}>Settings</Text>
          <Image
            style={{ width: 20, height: 20, marginRight: 20 }}
            source={ImageIndex.icons.arrowhead}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: FontIndex.WorkSans.Medium,
    color: Colors.softBlack,
    fontSize: 18,
  },
  bodyContainer: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    marginBottom: 42,
  },
  avatar: {
    height: 75,
    width: 75,
    marginBottom: 13,
  },
  userNameText: {
    fontFamily: FontIndex.WorkSans.Medium,
    color: Colors.softBlack,
    fontSize: 18,
  },
  userTypeText: {
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.secondaryGray,
    fontSize: 14,
  },
  infoItem: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  infoItemField: {
    fontFamily: FontIndex.WorkSans.Regular,
    color: Colors.softBlack,
    fontSize: 14,
    width: '30%',
  },
  infoItemValue: {
    fontFamily: FontIndex.WorkSans.Medium,
    color: Colors.softBlack,
    fontSize: 14,
  },

  accountText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 16,
    color: Colors.softBlack,
    marginBottom: 24,
  },
  settingsText: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 16,
    color: Colors.softBlack,
    marginLeft: 20,
  },
})
