import React, { useState } from 'react';
import { SvgFC } from '../../../../assets/icons/SvgInterface';
import { Modal, StyleSheet, View, Text, Dimensions } from 'react-native';
import { CommonButton } from '../../common/CommonButton';
import { Colors, PrimaryColorType } from '../../../../assets/Colors';

export type UpchieveModalType = {
  visible: boolean;
  icon?: SvgFC | React.FC;
  title?: string;
  text?: string;
  type?: PrimaryColorType;
  coloredIcon?: boolean;
  cancelButtonText?: string;
  cancelButtonPress?: () => Promise<void>;
  actionButtonPress?: () => Promise<void>;
  actionButtonText?: string;
};

export const UpchieveModal: React.FC<UpchieveModalType> = ({
  visible,
  type,
  icon: Icon,
  title,
  text,
  coloredIcon = true,
  actionButtonText = 'OK',
  actionButtonPress = async () => { },
  cancelButtonPress,
  cancelButtonText,
}) => {

  const renderIcon = () => {
    if (Icon) {
      return coloredIcon && type ? (
        <View>
          <Icon width={55} height={55} stroke={Colors[type]} />
        </View>
      ) : (
        <Icon width={55} height={55} />
      );
    }
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>{renderIcon()}</View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.buttonContainer}>
              {cancelButtonText && cancelButtonPress && (
                <CommonButton
                  title={cancelButtonText}
                  onPress={cancelButtonPress}
                  style={{ marginRight: 10, paddingHorizontal: 20, }}
                />
              )}
              {actionButtonText && actionButtonPress && (
                <CommonButton
                  title={actionButtonText}
                  onPress={actionButtonPress}
                  type={type}
                  style={{paddingHorizontal: 20,}}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get('window').width - 40,
  },
  iconContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#F4F9FE',
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 19,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#565961',
    marginBottom: 25,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
