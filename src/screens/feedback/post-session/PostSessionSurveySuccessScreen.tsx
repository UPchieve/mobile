import React from 'react';
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ImageIndex } from "../../../../assets/ImageIndex";
import { FontIndex } from "../../../../assets/FontIndex";
import { Colors } from "../../../../assets/Colors";
import { CommonButton } from "../../../components/common/CommonButton";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../routes/MainStackNavigator';



type PostSessionSurveySuccess = NativeStackScreenProps<MainStackParamList, 'PostSessionSurveySuccess'>;
export const PostSessionSurveySuccessScreen: React.FC<PostSessionSurveySuccess> = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.background}>
                        <View style={styles.bodyWrapper}>
                            <View style={styles.imagePosition}>
                                <Image style={styles.image}
                                    source={ImageIndex.feedback.postFeedback} />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.title}>Thank you for your feedback!</Text>
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.subtitle}>Your feedback is very important to us.   Without it we wouldn’t know how to improve your experience on our platform. </Text>
                            </View>
                            <View style={styles.textWrapper}>
                                <CommonButton title={'Go to my dashboard'} onPress={() => {
                                    navigation.reset({
                                        routes: [{name: 'DashboardScreen'}]
                                    });
                                }} type={'success'} style={{ alignItems: 'center' }} rightIcon={ImageIndex.feedback.goArrow} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        marginTop: 100,
        borderRadius: 173,
        height: Dimensions.get('window').height - 100,
        backgroundColor: '#F3F7FD',
    },
    image: {
        width: 241,
        height: 294
    },
    bodyWrapper: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 31
    },
    imagePosition: {
        marginTop: 46,
        marginBottom: 10
    },
    title: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 22
    },
    subtitle: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray,
        textAlign: 'center'
    },
    button: {
        width: '100%'
    },
    textWrapper: {
        marginTop: 36,
        width: '100%'
    }
})
