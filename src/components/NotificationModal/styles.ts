import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerTitleContainer: {
    position: 'absolute',
    top: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  message: {
    fontFamily: 'Nunito-Regular',
    fontSize: 17,
    color: '#fff',
  },
});

export default styles;
