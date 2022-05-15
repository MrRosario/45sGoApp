import React, { useState, FC } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Font } from "../styles";

import { Card, Button, TimerEditor } from "../components";

const Home: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState("");

  const handlePressCard = (title: any) => {
    setIsModalVisible(true);
    setModalTitle(title);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Vamos treinar!</Text>
        </View>

        <View style={styles.content}>
          <Card
            type="prepare"
            title="Preparar"
            time="00:05"
            callback={handlePressCard}
          />
          <Card
            type="exercise"
            title="Exercitar"
            time="00:45"
            callback={handlePressCard}
          />
          <Card
            type="rest"
            title="Descansar"
            time="00:30"
            callback={handlePressCard}
          />
          <Card
            type="rounds"
            title="Rodadas"
            time="1"
            callback={handlePressCard}
          />
        </View>

        <Button
          size="large"
          title="INICIAR"
          callBack={() => console.log("INICIAR Exercicio")}
        />
      </View>
      {isModalVisible && (
        <TimerEditor
          modalTitle={modalTitle}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 33,
  },
  titleWrapper: {
    marginVertical: 40,
  },
  title: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_25,
    color: "#000000",
  },
});

export default Home;
