import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

import NotificationModal from './components/NotificationModal';

import Routes from './routes';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ])
      .then((result) => {
        if (
          result['android.permission.CAMERA'] === RESULTS.DENIED ||
          result['android.permission.READ_EXTERNAL_STORAGE'] ===
            RESULTS.DENIED ||
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === RESULTS.DENIED
        ) {
          setTitle('Permissões negadas');
          setMessage(
            'Suas permissões foram negadas, a funcionalidade de Câmera e de Armazenamento está inativa.',
          );
          setVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Routes />

      <NotificationModal
        visible={visible}
        title={title}
        message={message}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default App;
