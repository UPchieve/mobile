import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { DotIcon } from '../../../../assets/icons/DotIcon';
import { SvgFC } from '../../../../assets/icons/SvgInterface';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { SvgIcons } from '../../../../assets/IndexIcons';
import { AuthContext } from '../../../providers/AuthProvider';
import { Separator } from '../../atoms/common/Separator';
type UserInfoType = {
    dismiss: () => void;
}
const avatar = ImageIndex.avatars.student;
const userType = 'Student';

//TODO REVIEW THIS SCREEN
export const UserInfo: React.FC<UserInfoType> = ({ dismiss }) => {

    const { user } = useContext(AuthContext);

    const renderIcon = (Icon: SvgFC, text: string, action?: () => void,) => {
        return <View style={styles.menuItemContainer}>
            <Icon />
            <View style={{ marginLeft: 16 }} />
            <Text style={styles.menuItemText}>{text}</Text>
        </View>
    }

    return <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={avatar} style={styles.avatar} />
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userNameText}>{user.firstname}</Text>
                    <View style={{ marginVertical: 1 }} />
                    <Text style={styles.userTypeText}>{userType}</Text>
                </View>
                <TouchableOpacity onPress={dismiss} style={styles.closeIconContainer}>
                    <SvgIcons.CloseIcon stroke={Colors.softBlack} />
                </TouchableOpacity>
            </View>
            <View style={styles.userStateContainer}>
                <SvgIcons.DotIcon width={8} fill={Colors.warning} stroke={Colors.warning} />
                <Text style={styles.userStateText}>Waiting</Text>
            </View>
            <Separator backgroundColor={Colors.borderGray} marginVertical={16} />
            <FlatList
                data={[
                    { icon: SvgIcons.HouseIcon, title: 'Dashboard', },
                    { icon: SvgIcons.ProfileIcon, title: 'Profile' },
                    { icon: SvgIcons.EmailIcon, title: 'Contact Us' }
                ]}
                renderItem={({ item }) => renderIcon(item.icon, item.title)}
                ItemSeparatorComponent={() => <View style={{ marginTop: 4, }} />}
                keyExtractor={item => `usermenu_${item.title}`}
            />
        </View>
    </SafeAreaView>
    // </Modal>
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        backgroundColor: Colors.white,
        justifyContent: 'flex-start'
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    avatar: {
        width: 48,
        height: 48,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
    },
    userInfoContainer: {
        marginLeft: 15,
    },
    userNameText: {
        fontFamily: FontIndex.WorkSans.Medium,
        color: Colors.softBlack,
        fontSize: 18,
    },
    userTypeText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray
    },
    closeIconContainer: {
        position: 'absolute',
        right: 4,
        top: 4,
    },
    userStateContainer: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center',
    },
    userStateText: {
        fontFamily: FontIndex.WorkSans.Regular,
        color: Colors.softBlack,
        fontSize: 16,
        marginLeft: 8,
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    menuItemText: {
        fontFamily: FontIndex.WorkSans.Medium,
        color: Colors.softBlack,
        fontSize: 16,
    },
});