import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FlatList, Linking, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { SvgIcons } from '../../../../assets/IndexIcons';
import { eligibilityService } from '../../../services/eligibilityService';
import { DelayTextInput, DelayTextInputHandle } from '../../atoms/common/DelayTextInput';
import { Separator } from '../../atoms/common/Separator';
import {config, configLocal} from '../../../../config';

type HighSchoolPickerType = {
    visible: boolean;
    onSelect: (item: School) => void;
    onCancel: () => void;
}

export const HighSchoolPicker: React.FC<HighSchoolPickerType> = ({ visible, onSelect, onCancel }) => {

    const [term, setTerm] = useState('');
    const [data, setData] = useState<School[]>([]);

    const searchInputRef = useRef<DelayTextInputHandle>(null);

    useEffect(() => {
        (async () => {
            if (term.length > 0) {
                const data = await eligibilityService.getSchools(term);
                setData(data);
            } else {
                setData([]);
            }
        })();
    }, [term]);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, [visible]);

    const itemPicked = (item: School) => {
        onSelect(item);
        searchInputRef.current?.setText('');
        setData([]);
        setTerm('');
        onCancel();
    }

    const renderItem = ({ item }: { item: School }) => {
        return <>
            <TouchableOpacity onPress={() => itemPicked(item)} style={{ minHeight: 34, justifyContent: 'center' }}>
                <Text style={styles.itemText}>{item.name} ({item.city}, {item.state})</Text>
            </TouchableOpacity>
            <Separator backgroundColor={Colors.defaultGray} />
        </>
    }

    const listFooterComponent = () => {
        return <TouchableOpacity style={{ marginTop: 5, }} onPress={() => Linking.openURL(`${configLocal.baseUrl}/cant-find-school`)}>
            <Text style={[styles.cancelText, { marginLeft: 10 }]}>Can’t find your school?</Text>
        </TouchableOpacity>
    }

    const onClearPress = () => {
        searchInputRef.current?.setText('');
        setData([]);
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.inputWrapper}>
                            <View style={styles.inputInternWrapper}>
                                <SvgIcons.GlassIcon />
                                <DelayTextInput value={term} onChangeText={setTerm} style={{ flex: 1, paddingHorizontal: 8, fontSize: 14, fontFamily: FontIndex.WorkSans.Regular }}
                                    ref={searchInputRef} />
                                {!!term ?
                                    <TouchableOpacity onPress={onClearPress}>
                                        <SvgIcons.ClearInputIcon />
                                    </TouchableOpacity>
                                    : null}
                            </View>
                        </View>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        ListFooterComponent={listFooterComponent}
                        keyExtractor={(e) => e.id}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputWrapper: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.information,
        borderRadius: 4,
        paddingVertical: 10,
    },
    inputInternWrapper: {
        // flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    cancelText: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 16,
        color: Colors.information
    },
    itemText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        marginLeft: 10,
    }
});
