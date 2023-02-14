import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

import usePhotosStore from '~/shared/store';

import CameraPlaceholder from './CameraPlaceholder';

const styles = StyleSheet.create({
  root: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  photo: {
    borderColor: 'white',
    borderWidth: 4,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    bottom: '5%',
    marginLeft: -30,
  },
  photoInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
  },
});

const _hints: Partial<
  Record<
    CameraPermissionStatus,
    {title: React.ReactNode; button?: React.ReactNode}
  >
> = {
  'not-determined': {
    title: 'Please approve access to camera 📸',
    button: 'Request Permissions',
  },
  denied: {
    title: 'Please approve access to camera 📸',
    button: 'Go to Settings',
  },
};

const CameraScreen = () => {
  const savePhoto = usePhotosStore(state => state.savePhoto);

  const devices = useCameraDevices('wide-angle-camera');
  const camera = React.useRef<Camera>(null);
  const [cameraStatus, setCameraStatus] = React.useState<
    CameraPermissionStatus | undefined
  >(undefined);

  const isFocused = useIsFocused();

  const requestPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
      status = await Camera.requestCameraPermission();
    }
    setCameraStatus(status);
  };

  const onButtonPress = React.useCallback(() => {
    if (cameraStatus === 'not-determined') {
      requestPermission();
    } else {
      Linking.openSettings();
    }
  }, [cameraStatus]);

  React.useEffect(() => {
    requestPermission();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto?.({
      flash: 'on',
    });
    if (photo) {
      savePhoto(photo);
    }
  };

  return (
    <View style={styles.root}>
      {devices.front && cameraStatus === 'authorized' && (
        <>
          <Camera
            ref={camera}
            device={devices.front}
            isActive={isFocused}
            photo
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity style={styles.photo} onPress={takePhoto}>
            <View style={styles.photoInner} />
          </TouchableOpacity>
        </>
      )}
      {!devices.front && <ActivityIndicator size={58} color="white" />}
      {devices.front && cameraStatus && cameraStatus !== 'authorized' && (
        <CameraPlaceholder
          title={_hints[cameraStatus]?.title}
          buttonLabel={_hints[cameraStatus]?.button}
          onButtonPress={onButtonPress}
        />
      )}
    </View>
  );
};

export default CameraScreen;
