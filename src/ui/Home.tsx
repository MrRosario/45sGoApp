import React, { useEffect, useState, FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; //TO BE REMOVED

import { Colors, Font } from "../styles";
import { getData } from "../services/localStorage";
import { splitString } from "../resources/commons";

import { Card, Button, TimerEditor } from "../components";

const Home: FC = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [trainSetUp, setTrainSetup] = useState<any>(null);
  const [min, setMin] = useState<string>("00");
  const [sec, setSec] = useState<string>("00");
  const [modalType, setModalType] = useState<string>("");
  const [rounds, setRounds] = useState<string>("1");

  const setMinAndSec = (time: string) => {
    const splitedNumber = splitString(time, ":", 2);
    const formattedNumber = splitedNumber.map((value) => value);

    setSec(formattedNumber[1]);
    setMin(formattedNumber[0]);
  };

  const handlePressCard = (title: string, type: string, time: string): void => {
    setIsModalVisible(true);
    setModalTitle(title);
    setModalType(type);

    setMinAndSec(time);
    if (type !== "rounds") {
      setMinAndSec(time);
      return;
    }

    setRounds(time);
  };

  const fetchLocalStorage = async (): Promise<any> => {
    const data = await getData();
    const formattedData = data?.map((item: any) => {
      return {
        key: item[0],
        values: JSON.parse(item[1]),
      };
    });
    setTrainSetup(formattedData);
  };

  useEffect(() => {
    fetchLocalStorage();
  }, [isModalVisible]);

  // console.log("trainSetUp: ", trainSetUp);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Vamos treinar!</Text>
        </View>

        <View style={styles.content}>
          {trainSetUp?.map((item: any) => {
            const { type, title, min, sec, rounds } = item.values;
            return (
              <Card
                key={item.key}
                type={type}
                title={title}
                time={type !== "rounds" ? `${min}:${sec}` : rounds}
                callback={handlePressCard}
              />
            );
          })}
        </View>

        <Button
          size="large"
          title="INICIAR"
          callBack={() => navigation.navigate("ExerciseScreen")}
        />
        {/* TO BE REMOVED */}
        <TouchableOpacity onPress={async () => await AsyncStorage.clear()}>
          <Text>Clean</Text>
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <TimerEditor
          modalTitle={modalTitle}
          modalType={modalType}
          rounds={rounds}
          min={min}
          sec={sec}
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
    backgroundColor: Colors.WHITE,
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
