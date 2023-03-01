import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {usePhotosStore} from '~/shared/store';
import theme from '~/shared/theme';

import PhotoItem from './PhotoItem';

// TODO: Give some equal spacing between components
const styles = StyleSheet.create({
  root: {flex: 1},
  separator: {height: 12},
  content: {padding: 12},
  itemStart: {marginEnd: 6},
  itemEnd: {marginStart: 6},
  camera: {
    backgroundColor: theme.colors.card,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    elevation: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const GalleryScreen = () => {
  const photos = usePhotosStore(state => state.photos);
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      {/* TODO: Switch to FlatList for better rendering */}
      <FlatList
        data={photos}
        renderItem={({item: photo, index}) => {
          const itemStyle = styles[index % 2 === 0 ? 'itemStart' : 'itemEnd'];
          return (
            <PhotoItem
              photo={photo}
              style={itemStyle}
              onPress={() => navigation.navigate('Photos', {photo})}
            />
          );
        }}
        keyExtractor={({path}) => path}
        numColumns={2}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.content}
      />
      {/* TODO: Wrap in a ScrollView */}
      {/* <ScrollView>
        {photos.map(photo => (
          <PhotoItem
            key={photo.path}
            photo={photo}
            onPress={() => navigation.navigate('Photos', {photo})}
          />
        ))}
      </ScrollView> */}
      {/* TODO: Switch to TouchableOpacity and activate onPress */}
      <TouchableOpacity
        style={styles.camera}
        onPress={() => navigation.navigate('Camera')}>
        <Icon name="camera" color="white" size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default GalleryScreen;
