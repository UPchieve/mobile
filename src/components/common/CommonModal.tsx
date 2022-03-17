import React from 'react';
import { SvgFC } from '../../../assets/icons/SvgInterface';
import { Modal, StyleSheet, View, Text, Dimensions } from 'react-native';
import { CommonButton } from './CommonButton';
import { Colors, PrimaryColorType } from '../../../assets/Colors';

export type ICommonModal = {
  visible: boolean;
  icon?: SvgFC;
  title?: string;
  text?: string;
  type?: PrimaryColorType;
  coloredIcon?: boolean;
  cancelButtonText?: string;
  cancelButtonPress?: () => void;
  actionButtonPress?: () => void;
  actionButtonText?: string;
};

export const CommonModal: React.FC<ICommonModal> = ({
  visible,
  type,
  icon: Icon,
  title,
  text,
  coloredIcon = true,
  actionButtonText = 'OK',
  actionButtonPress = () => {},
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
                  style={{ marginRight: 10 }}
                />
              )}
              {actionButtonText && actionButtonPress && (
                <CommonButton
                  title={actionButtonText}
                  onPress={actionButtonPress}
                  type={type}
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
