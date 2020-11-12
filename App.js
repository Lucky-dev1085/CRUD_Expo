import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppContainer from './src/navigation';
import Firebase, { FirebaseProvider } from './src/config/Firebase'
import { ThemeProvider } from 'react-native-elements';

const theme = {}

export default function App() {
  return (
    <ThemeProvider theme={theme} >
        <FirebaseProvider value={Firebase}>
          <AppContainer />
        </FirebaseProvider>
      </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
