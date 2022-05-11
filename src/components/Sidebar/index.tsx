import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../styles";


const SideBar: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
      </View>

      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    height: "100%",
    width: "100%",
  },
  header: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242020",
  },
  body: {},
});

export default SideBar;