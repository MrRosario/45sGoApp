import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import CircularProgressBar from "../components/CircularProgressBar";
import { PogressBarMode } from "../components/CircularProgressBar/types";
import { Colors, Font } from "../styles";
import { Button } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fortyFiveSgo } from "../resources/constants";
import { getData } from "../services/localStorage";
import { useProgress } from "../hooks/useProgress";
import { useCountdown } from "../hooks/useCountDown";

type LocalDataType = {
  min: string;
  sec: string;
  title: string;
  type: string;
};
const Exercise: FC = ({ navigation }: any) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [rounds, setRounds] = useState<string>("");
  const [prepare, setPrepare] = useState<LocalDataType | undefined>();
  const [exercise, setExercise] = useState<LocalDataType | undefined>();
  const [rest, setRest] = useState<LocalDataType | undefined>();
  const [isProgressFinished, setIsProgressFinished] = useState<boolean>(false);
  const [localStorage, setLocalStorage] = useState<any>();
  // const progress = useProgress();
  const MIN = 1;
  const SEC = 10;
  const [minutes, seconds] = useCountdown(MIN, SEC, isPaused);

  const RenderMode = ({ title, time }: any) => (
    <View style={styles.content}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.label}>{time}</Text>
    </View>
  );

  const fetchLocalStorage = async (): Promise<any> => {
    const data = await getData();
    const formattedData: any = data?.map((item: any) => {
      return {
        key: item[0],
        values: JSON.parse(item[1]),
      };
    });
    setData(formattedData);
    setLocalStorage(formattedData);
  };

  const setData = (formattedData: any) => {
    formattedData?.forEach((item: any) => {
      if (item.key === fortyFiveSgo.rounds) setRounds(item?.values?.rounds);
      if (item.key === fortyFiveSgo.prepare) setPrepare(item?.values);
      if (item.key === fortyFiveSgo.exercise) setExercise(item?.values);
      if (item.key === fortyFiveSgo.rest) setRest(item?.values);
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Tem certeza de que deseja interromper o treino?", "", [
      {
        text: "Cancelar",
        onPress: () => setIsPaused(false),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => navigation.goBack(),
      },
    ]);

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  // console.log("localStorage: ", localStorage);

  console.log(`minutes: ${minutes}, seconds: ${seconds}`);

  return (
    <View style={styles.container}>
      <CircularProgressBar
        minutes={minutes}
        seconds={seconds}
        mode={PogressBarMode["prepare"]}
      />
      <View>
        <View>
          <RenderMode title="Rodadas" time={rounds} />
          <RenderMode
            title="Tempo Total"
            time={`${exercise?.min}:${exercise?.sec}`}
          />
        </View>

        <View style={styles.buttonsWrapper}>
          <Button
            size="small"
            title={!isPaused ? "Pausar" : "Continuar"}
            callBack={() => setIsPaused(!isPaused)}
          />
          <Button
            size="small"
            title="Cancelar"
            callBack={() => {
              setIsPaused(true);
              createTwoButtonAlert();
            }}
            outline
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  content: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: Font.FAMILY.LIGHT,
    fontWeight: Font.WEIGHT.LIGHT,
    fontSize: Font.SIZE.SIZE_18,
    color: Colors.BLACK,
  },
  buttonsWrapper: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Exercise;
