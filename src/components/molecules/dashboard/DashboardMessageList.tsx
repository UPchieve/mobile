import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { DashboardMessage, DashboardMessageType } from '../../atoms/dashboard/DashboardMessage';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Colors } from '../../../../assets/Colors';

type DashboardMessageListType = {
    messages: DashboardMessageType[];
    autoChange?: number;
}

const Dot: React.FC<{ scrollX: any, width: number, i: number }> = ({ scrollX, width, i }) => {
    const dotStyle = useAnimatedStyle(() => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotColor = interpolateColor(scrollX.value
            , inputRange, [Colors.borderGray, 'rgba(22, 210, 170, 0.5)', Colors.borderGray])
        return {
            backgroundColor: dotColor,
        }
    });

    return <Animated.View style={[
        {
            width: 10,
            height: 10,
            marginHorizontal: 10,
            borderRadius: 100,
            backgroundColor: Colors.defaultGray,
        },
        dotStyle
    ]} />
}

export const DashboardMessageList: React.FC<DashboardMessageListType> = ({ messages, autoChange }) => {
    const [width, setWidth] = useState(0);
    const flatListRef = React.useRef<FlatList<DashboardMessageType>>(null);
    const pageNum = useSharedValue(0);
    const scrollX = useSharedValue(0);
    const [autoChangeInterval, setAutoChangeInterval] = useState<any>(null);

    const startAutoChange = () => {
        let interval: any;
        if (autoChange) {
            autoChangeInterval && clearInterval(autoChangeInterval);
            interval = setInterval(() => {
                const index = pageNum.value < messages.length - 1 ? pageNum.value + 1 : 0;
                flatListRef.current?.scrollToIndex({
                    index,
                });
            }, autoChange);
            setAutoChangeInterval(interval);
        }
        return () => clearInterval(interval);
    }

    useEffect(() => {
        const clear = startAutoChange();
        return () => clear();
    }, [autoChange])

    return <View>
        <FlatList
            ref={flatListRef}
            onLayout={({ nativeEvent }) => {
                setWidth(nativeEvent.layout.width);
            }}
            horizontal
            onScroll={(e) => {
                startAutoChange();
                const { nativeEvent } = e;
                scrollX.value = nativeEvent.contentOffset.x
            }}
            onMomentumScrollEnd={({ nativeEvent }) => {
                const contentOffset = nativeEvent.contentOffset;
                const viewSize = nativeEvent.layoutMeasurement;
                const newPageNum = Math.floor(contentOffset.x / viewSize.width);
                pageNum.value = newPageNum;
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={messages}
            renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 2.5, height: '100%', }} />
                <DashboardMessage {...item} fixedWidth={width - 5} />
                <View style={{ width: 2.5, height: '100%', }} />
            </View>}
            keyExtractor={(i) => `banner_${i.message}_${i.type}`}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 20, marginTop: 10 }}>
            {messages.map((_, i) =>
                <Dot scrollX={scrollX} width={width} i={i} key={i} />
            )}
        </View>
    </View>
}