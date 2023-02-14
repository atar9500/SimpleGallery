import {PhotoFile} from 'react-native-vision-camera';
import {create} from 'zustand';
import * as RNFS from 'react-native-fs';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
const _shutterSound = new Sound('camera.mp3', Sound.MAIN_BUNDLE);

type PhotosStore = {
  photos: PhotoFile[];
  savePhoto: (photo: PhotoFile) => Promise<void>;
};

const usePhotosStore = create(
  persist<PhotosStore>(
    set => ({
      photos: [],
      savePhoto: async photo => {
        _shutterSound.stop();
        _shutterSound.play();

        const pathSegments = photo.path.replace('file://', '').split('/');
        const fileName = pathSegments[pathSegments.length - 1];

        const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.moveFile(photo.path, destinationPath);

        const path = `file://${destinationPath}`;
        set(state => ({photos: [{...photo, path}, ...state.photos]}));
      },
    }),
    {
      name: 'photos-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default usePhotosStore;
