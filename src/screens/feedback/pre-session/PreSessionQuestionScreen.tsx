import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {H3} from "../../../components/atoms/common/H3";
import {HelperText} from "../../../components/atoms/onboarding/HelperText";
import {Colors} from "../../../../assets/Colors";
import {Separator} from "../../../components/atoms/common/Separator";

export const PreSessionQuestionScreen = () => {
    return <SafeAreaView>
        <View style={{marginHorizontal: 20}}>
            <Separator backgroundColor={'transparent'} marginVertical={24}/>
            <H3>Tell us about your request</H3>
            <HelperText color={Colors.secondaryGray} mt={16}>This info will help us find the best coach to pair you with.</HelperText>
            <View style={styles.body}>

            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.selectedGreen
    }
})
