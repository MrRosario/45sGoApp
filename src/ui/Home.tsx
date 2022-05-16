import React, { useEffect, useState, FC } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Font } from "../styles";
import { getData } from "../services/localStorage";
import { mildVital } from "../resources/constants";

import { Card, Button, TimerEditor } from "../components";

const Home: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [trainSetUp, setTrainSetup] = useState<any>(null);

  const handlePressCard = (title: any): void => {
    setIsModalVisible(true);
    setModalTitle(title);
  };

  const setData = async (): Promise<void> => {
    const data = await getData();
    const formattedData = data?.map((item) => {
      return {
        key: item[0],
        values: JSON.parse(item[1]),
      };
    });
    setTrainSetup(formattedData);
  };

  useEffect(() => {
    setData();
  }, []);

  console.log("LocalData Home: ", trainSetUp);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Vamos treinar!</Text>
        </View>

        <View style={styles.content}>
          {trainSetUp?.map((item: any) => {
            const { type, title, min, seg, rounds } = item.values;
            return (
              <Card
                key={item.key}
                type={type}
                title={title}
                time={type !== "rounds" ? `${seg}:${min}` : rounds}
                callback={handlePressCard}
              />
            );
          })}
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
