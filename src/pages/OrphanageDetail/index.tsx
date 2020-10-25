import React, {useCallback, useState} from 'react';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {Orphanage, OrphanageDetailParams} from '../../interfaces';

import styles from './styles';
import api from '../../services/api';

const OrphanageDetail: React.FC = () => {
  const route = useRoute();
  const {id} = route.params as OrphanageDetailParams;

  const [orphanage, setOrphanage] = useState<Orphanage>();

  const handleOpenGoogleMap = useCallback(() => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination${orphanage?.latitude},${orphanage?.longitude}`,
    );
  }, [orphanage]);

  useFocusEffect(() => {
    async function getOrphanage() {
      try {
        const response = await api.get(`orphanages/${id}`);
        setOrphanage(response.data);
      } catch (error) {}
    }
    getOrphanage();
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage &&
            orphanage.images.map((image) => (
              <Image
                key={image.id}
                style={styles.image}
                source={{
                  uri: image.url,
                }}
              />
            ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage?.name}</Text>
        <Text style={styles.description}>{orphanage?.about}</Text>

        <View style={styles.mapContainer}>
          {orphanage && (
            <MapView
              initialRegion={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={styles.mapStyle}>
              <Marker
                icon={require('../../assets/map-marker.png')}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
              />
            </MapView>
          )}

          <TouchableOpacity
            style={styles.routesContainer}
            activeOpacity={0.4}
            onPress={handleOpenGoogleMap}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        {orphanage && (
          <Text style={styles.description}>{orphanage.instructions}</Text>
        )}

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <FeatherIcon name="clock" size={40} color="#2AB5D1" />
            {orphanage && (
              <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
                Segunda à Sexta {orphanage.opening_hours}
              </Text>
            )}
          </View>

          {orphanage?.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <FeatherIcon name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Atendemos fim de semana
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <FeatherIcon name="info" size={40} color="#ff669d" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não atendemos no fim de semana
              </Text>
            </View>
          )}
        </View>

        {/* <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesomeIcon name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton> */}
      </View>
    </ScrollView>
  );
};

export default OrphanageDetail;
