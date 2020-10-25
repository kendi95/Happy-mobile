import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MapView, {Marker, MapEvent} from 'react-native-maps';

import styles from './styles';
const SelectMapPosition: React.FC = () => {
  const {navigate} = useNavigation();

  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const handleSelectMapPosition = useCallback(({nativeEvent}: MapEvent) => {
    const {latitude, longitude} = nativeEvent.coordinate;
    setPosition({latitude, longitude});
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        onPress={handleSelectMapPosition}
        initialRegion={{
          latitude: -23.3184005,
          longitude: -51.1480857,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}>
        {position.latitude !== 0 && (
          <Marker
            icon={require('../../../assets/map-marker.png')}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton
          style={styles.nextButton}
          onPress={() => navigate('OrphanageData', position)}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

export default SelectMapPosition;
