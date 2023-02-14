import {PhotoFile} from 'react-native-vision-camera';

export type RootStackParamList = {
  Gallery: undefined;
  Camera: undefined;
  Photos: {photo: PhotoFile};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
