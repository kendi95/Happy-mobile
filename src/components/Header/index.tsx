import {useNavigation, StackActions} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './styles';
import {HeaderProps} from '../../interfaces';

const Header: React.FC<HeaderProps> = ({
  title,
  showCancel = true,
  indexPage = 1,
}) => {
  const {goBack, dispatch} = useNavigation();

  const handleGoBackToFirstScreen = useCallback(() => {
    dispatch(StackActions.pop(indexPage));
  }, [dispatch, indexPage]);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={goBack}>
        <FeatherIcon name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCancel && (
        <BorderlessButton onPress={handleGoBackToFirstScreen}>
          <FeatherIcon name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      )}
      {!showCancel && <View />}
    </View>
  );
};

export default Header;
