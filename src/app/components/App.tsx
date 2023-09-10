import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// BUG: External imports should NOT go beyond the index file
import CameraScreen from '~/camera/components/CameraScreen';
import GalleryStack from '~/gallery';
import theme from '~/shared/theme';

const styles = StyleSheet.create({
  root: {flex: 1},
});

const Stack = createNativeStackNavigator();

const _galleryStackOptions: NativeStackNavigationOptions = {headerShown: false};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="GalleryStack"
            component={GalleryStack}
            options={_galleryStackOptions}
          />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
