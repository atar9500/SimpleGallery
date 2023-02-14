import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import theme from '~/shared/theme';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  message: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '65%',
  },
  button: {
    backgroundColor: theme.colors.card,
    padding: 8,
    borderRadius: 8,
    elevation: 6,
    marginTop: 12,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

type CameraPlaceholderProps = {
  title: React.ReactNode;
  buttonLabel?: React.ReactNode;
  onButtonPress?: () => void;
};

const CameraPlaceholder = ({
  title,
  buttonLabel,
  onButtonPress,
}: CameraPlaceholderProps) => {
  return (
    <View style={styles.root}>
      <Text style={styles.message}>{title}</Text>
      {buttonLabel && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonLabel}>{buttonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CameraPlaceholder;
