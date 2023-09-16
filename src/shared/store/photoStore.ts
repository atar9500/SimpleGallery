import {PhotoFile} from 'react-native-vision-camera';
import {create} from 'zustand';
import * as RNFS from 'react-native-fs';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// BUG: This import breaks the welldone file-structure, we should fix it

type PhotosStore = {
  photos: PhotoFile[];
  savePhoto: (photo: PhotoFile) => Promise<void>;
};

export const usePhotosStore = create(
  persist<PhotosStore>(
    set => ({
      photos: [],
      savePhoto: async photo => {
        const pathSegments = photo.path.replace('file://', '').split('/');
        const fileName = pathSegments[pathSegments.length - 1];

        const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.moveFile(photo.path, destinationPath);

        const path = `file://${destinationPath}`;
        set(state => ({
          photos: [{...photo, path}, ...state.photos],
          savePhotoLoading: false,
        }));
      },
    }),
    {
      name: 'photos-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
