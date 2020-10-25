import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import NotificationModal from '../../../components/NotificationModal';
import ImagePicker from 'react-native-image-picker';

import {OrphanageDataParams} from '../../../interfaces';
import api from '../../../services/api';

import styles from './styles';

const OrphanageData: React.FC = () => {
  const {params} = useRoute();
  const position = params as OrphanageDataParams;
  const {navigate} = useNavigation();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [opening_hours, setOpeningHours] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const onDidError = useCallback((errorTitle, errorMessage) => {
    setTitle(errorTitle);
    setMessage(errorMessage);
    setVisible(true);
  }, []);

  const handleSelectImages = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        allowsEditing: true,
        takePhotoButtonTitle: 'Tirar foto...',
        chooseFromLibraryButtonTitle: 'Escolher uma imagem da biblioteca',
        storageOptions: {
          skipBackup: true,
          path: 'images',
          waitUntilSaved: true,
          cameraRoll: true,
        },
        cancelButtonTitle: 'Cancelar',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          onDidError(
            'Erro de imagem',
            'Houve um erro ao tirar ou escolher uma foto.',
          );
        }

        const {uri} = response;
        setImages((oldURI) => [...oldURI, uri]);
      },
    );
  }, [onDidError]);

  const handleCreateOrphanage = useCallback(async () => {
    try {
      const {latitude, longitude} = position;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('latitude', String(latitude));
      formData.append('longitude', String(longitude));
      formData.append('instructions', instructions);
      formData.append('open_on_weekends', open_on_weekends);
      formData.append('opening_hours', opening_hours);

      images.forEach((image, index) => {
        formData.append('files', {
          type: 'image/jpg',
          uri: image,
          name: `image-${Date.now()}-${index}.jpg`,
        } as any);
      });

      await api.post('/orphanages', formData);
      navigate('OrphanagesMap');
    } catch (error) {
      onDidError('Erro de cadastro', 'Houve um erro ao cadastrar um orfanato.');
    }
  }, [
    name,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    position,
    images,
    onDidError,
    navigate,
  ]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{padding: 24}}>
        <Text style={styles.title}>Dados</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />

        <Text style={styles.label}>Sobre</Text>
        <TextInput
          style={[styles.input, {height: 110}]}
          multiline
          onChangeText={setAbout}
          value={about}
        />

        {/* <Text style={styles.label}>Whatsapp</Text>
        <TextInput style={styles.input} /> */}

        <Text style={styles.label}>Fotos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.uploadedImagesContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{uri: image}}
              style={styles.uploadedImage}
            />
          ))}
          <TouchableOpacity
            style={styles.imagesInput}
            onPress={handleSelectImages}>
            <FeatherIcon name="plus" size={24} color="#15B6D6" />
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.title}>Visitação</Text>

        <Text style={styles.label}>Instruções</Text>
        <TextInput
          style={[styles.input, {height: 110}]}
          multiline
          onChangeText={setInstructions}
          value={instructions}
        />

        <Text style={styles.label}>Horario de visitas</Text>
        <TextInput
          style={styles.input}
          onChangeText={setOpeningHours}
          value={opening_hours}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Atende final de semana?</Text>
          <Switch
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
            thumbColor="#fff"
            trackColor={{false: '#ccc', true: '#39CC83'}}
          />
        </View>

        <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
          <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>
      </ScrollView>

      <NotificationModal
        visible={visible}
        title={title}
        message={message}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default OrphanageData;
