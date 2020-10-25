import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';
import {Orphanage} from '../../interfaces';
import NotificationModal from '../../components/NotificationModal';

const OrphanagesMap: React.FC = () => {
  const {navigate} = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleNavigation = useCallback(
    (screen, params = null) => {
      navigate(screen, params);
    },
    [navigate],
  );

  useEffect(() => {
    async function getOrphanages() {
      try {
        const response = await api.get('/orphanages');
        setOrphanages(response.data);
      } catch (error) {
        setTitle('Erro na requisição');
        setMessage('Houve um erro ao tentar buscar orfanatos.');
        setVisible(true);
      }
    }
    getOrphanages();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -23.3184005,
            longitude: -51.1480857,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}>
          {orphanages.length > 0 &&
            orphanages.map((orphanage) => (
              <Marker
                key={orphanage.id}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
                icon={require('../../assets/map-marker.png')}>
                <Callout
                  tooltip
                  onPress={() =>
                    handleNavigation('OrphanageDetail', {id: orphanage.id})
                  }>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {orphanages.length > 0
              ? `${orphanages.length} orfanatos encontrados`
              : 'Nenhum orfanato encontrado'}{' '}
          </Text>
          <RectButton
            style={styles.createOrphanageButton}
            onPress={() => handleNavigation('SelectMapPosition')}>
            <FeatherIcon name="plus" size={20} color="#fff" />
          </RectButton>
        </View>
      </View>

      <NotificationModal
        visible={visible}
        title={title}
        message={message}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default OrphanagesMap;
