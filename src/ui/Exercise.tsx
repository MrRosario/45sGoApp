import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CircularProgressBar from "../components/CircularProgressBar";
import { PogressBarMode } from "../components/CircularProgressBar/types";
import { Colors, Font } from "../styles";
import { Button } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fortyFiveSgo } from "../resources/constants";

const Exercise: FC = () => {
  const [paused, setPaused] = useState(false);
  const [rounds, setRounds] = useState(0);

  const RenderMode = ({ title, time }: any) => (
    <View style={styles.content}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.label}>{time}</Text>
    </View>
  );
  const fetchRounds = async () => {
    try {
      const result: any = await AsyncStorage.getItem(fortyFiveSgo.rounds);

      if (result !== null) {
        console.log("result?.rounds: ", result.rounds);
        setRounds(result?.rounds);
      }

      console.log("result: ", result);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchRounds();
  });

  console.log("rounds: ", rounds);
  return (
    <View style={styles.container}>
      <CircularProgressBar duration={15000} mode={PogressBarMode["Exercise"]} />
      <View>
        <RenderMode title="Rodadas" time={rounds} />
        {/* <RenderMode title="Tempo Total" time="01:00" /> */}
        <View style={styles.buttonsWrapper}>
          <Button
            size="small"
            title={!paused ? "Pausar" : "Continuar"}
            callBack={() => setPaused(!paused)}
          />
          <Button
            size="small"
            title="Cancelar"
            callBack={() => console.log("Cancelar")}
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
