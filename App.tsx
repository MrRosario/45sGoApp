import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import Home from './src/ui/Home';
import Header from './src/components/Header';

export default function App() {
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
