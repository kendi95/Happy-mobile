import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {NotificationModalProps} from '../../interfaces';

import styles from './styles';

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  title,
  message,
  onClose,
}) => {
  return (
    <Modal
      style={{
        backgroundColor: '#FC9191',
        borderColor: '#FB2626',
        borderWidth: 2,
        marginHorizontal: 48,
        marginVertical: 240,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
      }}
      isVisible={visible}
      onBackdropPress={onClose}
      hardwareAccelerated
      backdropColor="#000"
      backdropOpacity={0.2}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.headerTitleContainer}>
        <FeatherIcon name="alert-circle" size={32} color="#FB2626" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Modal>
  );
};

export default NotificationModal;
