import { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import AppLoading from "expo-app-loading";

import fontsSetup from "./src/setup/fonts";

import Home from './src/ui/Home';
import Header from './src/components/Header';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  async function loadFonts() {
    await fontsSetup();
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
