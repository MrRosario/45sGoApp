import "react-native-gesture-handler";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Pressable,
} from "react-native";

import AppLoading from "expo-app-loading";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useStorage } from "./src/services/localStorage";
import { Colors } from "./src/styles";
import fontsSetup from "./src/setup/fonts";
import HomeScreen from "./src/ui/Home";
import ExerciseScreen from "./src/ui/Exercise";
import { Sidebar, Header } from "./src/components";

import Menu from "./assets/icons/menu_icon.svg";
import Logo from "./assets/icons/Logo.svg";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  async function setup() {
    await fontsSetup();
    await useStorage();
  }

  function headerConfig(title: string) {
    return {
      headerBackTitleVisible: false,
      headerTitleAlign: "center",
      headerTitle: title,
      headerTintColor: Colors.TERCEARY,
    };
  }

  function MenuButton({ navigation }: any) {
    return (
      <Pressable
        style={{ paddingLeft: 16 }}
        onPress={() => navigation.openDrawer()}
      >
        <Menu />
      </Pressable>
    );
  }

  function MenuLogo() {
    return (
      <View style={{ paddingRight: 16 }}>
        <Logo />
      </View>
    );
  }

  function Root() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        backBehavior="history"
        screenOptions={({ navigation }) => ({
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerRight: () => <MenuLogo />,
        })}
      >
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: Colors.WHITE,
              height: 60,
            },
          }}
        />
      </Drawer.Navigator>
    );
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={setup}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={headerConfig("")}
            name="ExerciseScreen"
            component={ExerciseScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
