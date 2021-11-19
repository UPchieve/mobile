import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {ImageIndex} from "../../assets/images/ImageIndex";

export const LoginScreen = () => {
    return <View style={styles.container}>
        <Image style={styles.logo} source={ImageIndex.logo}/>
        <View style={styles.loginWrapper}>
            <View style={styles.loginTabsWrapper}>
                <Text style={[styles.tabText, styles.tabTextActive]}>Log In</Text>
                <Text style={styles.tabText}>Sign Up</Text>
            </View>
            <View>

            </View>
            <View style={styles.tabContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true}/>
                    <Text style={styles.mutedText}>Forgot password?</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const GREEN_COLOR = '#4DC7A2'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREEN_COLOR,
        alignItems: 'center'
    },
    logo: {
        marginTop: 130,
        height: 75,
        width: 180,
    },
    loginWrapper: {
        flexGrow: 1,
        marginTop: 20,
        width: '95%',
        backgroundColor: '#FEFEFE',
        marginBottom: 0,
    },
    loginTabsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginTop: 25,
        marginBottom: 50,
    },
    tabText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6E6F76',
    },
    tabTextActive: {
        color: '#4DC7A2'
    },
    tabContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    inputWrapper: {
        marginBottom: 30,
    },
    inputText: {
        fontSize: 18,
        color: '#6E6F76',
        marginBottom: 8,
    },
    input: {
        alignSelf: 'center',
        width: '100%',
        height: 30,
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    mutedText: {
        fontSize: 12,
        color: '#6E6F76',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        paddingVertical: 13,
        borderRadius: 20,
    },
    buttonText: {
        color: '#4DC7A2',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "600"
    }
});