import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import theme from '~/shared/theme';

const styles = StyleSheet.create({
  root: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24},
  title: {
    fontSize: 48,
    marginBottom: 24,
    color: theme.colors.text,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.card,
  },
  emailInput: {
    marginTop: 8,
  },
  signIn: {
    marginTop: 24,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: theme.colors.text,
  },
});

const AuthScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        inputMode="email"
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, styles.emailInput]}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => navigation.navigate('GalleryStack')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
