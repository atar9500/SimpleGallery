import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '~/shared/types/reactNavigation';
import usePhotosStore from '~/shared/store';

import PhotoItem from './PhotoItem';

type PhotosScreenProps = NativeStackScreenProps<RootStackParamList, 'Photos'>;

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center'},
  item: {flex: 1},
});

const PhotosScreen = ({route}: PhotosScreenProps) => {
  const photos = usePhotosStore(state => state.photos);

  const windowSize = React.useMemo(() => Dimensions.get('window'), []);

  const defaultIndex = React.useMemo(() => {
    const i = photos.findIndex(({path}) => route.params.photo.path === path);
    return i >= 0 ? i : 0;
  }, [route.params.photo.path, photos]);

  return (
    <View style={styles.root}>
      <Carousel
        height={windowSize.height}
        width={windowSize.width}
        data={photos}
        mode="parallax"
        loop={false}
        defaultIndex={defaultIndex}
        renderItem={({item}) => (
          <PhotoItem
            disabled
            key={item.path}
            photo={item}
            style={styles.item}
          />
        )}
      />
    </View>
  );
};

export default PhotosScreen;
