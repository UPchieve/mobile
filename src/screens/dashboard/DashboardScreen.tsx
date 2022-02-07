import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../assets/Colors';
import { FontIndex } from '../../../assets/FontIndex';
import { ImageIndex } from '../../../assets/ImageIndex';
import { ModalSelect } from '../../components/atoms/common/ModalSelect';
import { DashboardMessageList } from '../../components/molecules/dashboard/DashboardMessageList';
import { FullScreenSessionState } from '../../components/molecules/dashboard/FullScreenSessionState';
import { SubjectCard } from '../../components/molecules/dashboard/SubjectCard';
import { useUserState } from '../../hooks/useUserState';
import { AuthContext } from '../../providers/AuthProvider';
import { MainStackParamList } from '../../routes/MainStackNavigator';
import { sessionService } from '../../services/sessionService';
import { topics } from '../../utils/dashboardUtils';

const messages = [
    { message: 'This is a great time to make a request! We have plenty of coaches available between 12 pm - 2 am ET' },
    { message: 'This is another great momento to make a request!' },
    { message: 'The last message is just a little test!, its amazing!' }]
type DashboardScreenType = DrawerScreenProps<MainStackParamList, 'DashboardScreen'>;

export const DashboardScreen: React.FC<DashboardScreenType> = ({ navigation }) => {

    const { user, userState } = useContext(AuthContext);

    const insets = useSafeAreaInsets();
    const modalizeRef = useRef<Modalize>(null);
    const selectRef = useRef<ModalSelect>(null);

    useEffect(() => {
        (async () => userState.refreshUserState())()
    }, []);

    const onSessionSelected = (topic: string, subTopic: string) => {
        navigation.navigate('PreSessionQuestionScreen', {
            sessionType: topic,
            sessionSubTopic: subTopic
        });
    }
    if (userState.userState !== undefined) {
        return <FullScreenSessionState navigation={navigation} topInsets={insets.top} {...userState} />
    }
    return <View style={styles.container}>
        <ImageBackground source={ImageIndex.dashboard.background} style={[styles.headerBackground]}>
            <View style={styles.header}>
                <Text style={styles.helloText}>Hello, {user?.firstname}</Text>
                <Text style={[styles.helloText, { fontSize: 18, }]}>Welcome back to UPchieve!</Text>
            </View>
            <TouchableOpacity style={[styles.buttonImage, { top: insets.top }]} onPress={() => navigation.openDrawer()}>
                <Image source={ImageIndex.dashboard.openMenuButton} style={{ width: 28, height: 28, }} />
            </TouchableOpacity>
        </ImageBackground>
        <Modalize
            ref={modalizeRef}
            panGestureComponentEnabled
            alwaysOpen={Dimensions.get('screen').height - 250}
            snapPoint={Dimensions.get('screen').height - 200}
            HeaderComponent={<View style={{ marginTop: 30, }}>
                <DashboardMessageList messages={messages} autoChange={10000} />
                <Text style={styles.chooseText}>Choose a subject to get help with:</Text>
            </View>}
            modalStyle={{ paddingHorizontal: 20, }}
            handleStyle={{ top: 27, backgroundColor: Colors.borderGray }}
            withOverlay={false}
            flatListProps={{
                data: topics,
                renderItem: (({ item }) => <SubjectCard topic={item} selectRef={selectRef} onSelect={onSessionSelected} />),
                keyExtractor: item => `dashboardSubjectList_${item.key}`,
                ItemSeparatorComponent: () => <View style={{ marginVertical: 8, }} />,
                showsVerticalScrollIndicator: false,
            }}
        />
        <ModalSelect ref={selectRef} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    helloText: {
        fontFamily: FontIndex.WorkSans.Regular,
        color: Colors.white,
        fontSize: 24,
    },
    body: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 18,
        paddingBottom: 36,
        backgroundColor: Colors.white,
        top: -20,
        paddingTop: 40,
    },
    headerBackground: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        width: '100%',
    },
    chooseText: {
        color: Colors.secondaryGray,
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        marginBottom: 16,
    },
    buttonImage: {
        position: 'absolute',
        right: 20,
        top: 0,
    }
});