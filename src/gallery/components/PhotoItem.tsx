import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {PhotoFile} from 'react-native-vision-camera';

import theme from '~/shared/theme';

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
    height: 200,
    elevation: 8,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
});

type PhotoItemProps = TouchableOpacityProps & {
  photo?: PhotoFile;
};

const PhotoItem = ({style, photo, ...rest}: PhotoItemProps) => {
  return (
    <TouchableOpacity style={[styles.root, style]} {...rest}>
      <Image style={styles.image} source={{uri: `file://${photo?.path}`}} />
    </TouchableOpacity>
  );
};

export default PhotoItem;
