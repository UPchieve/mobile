import React from 'react'
import { ActivityIndicator, View } from "react-native"
import { Colors } from '../../../../assets/Colors'

export const AppLoading: React.FC = () => {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={Colors.success} />
    </View>
}