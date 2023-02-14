import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GalleryScreen from './GalleryScreen';
import PhotosScreen from './PhotosScreen';

const Stack = createNativeStackNavigator();

const GalleryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Photos" component={PhotosScreen} />
    </Stack.Navigator>
  );
};

export default GalleryStack;
