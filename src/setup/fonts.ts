import * as Font from "expo-font";

export default fontsSetup = async () =>
  await Font.loadAsync({
    "Ubuntu-Regular": require("../../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Light": require("../../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Bold": require("../../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Medium": require("../../assets/fonts/Ubuntu-Medium.ttf"),
  });
