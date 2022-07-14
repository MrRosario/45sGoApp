import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Font } from "../../styles";
import { Props } from "./types";
import { getData } from "../../services/localStorage";

const CircularProgressBar: FC<Props> = ({ minutes, seconds, mode }) => {
  const BAR_COLORS: any = {
    exercise: Colors.PRIMARY,
    prepare: Colors.CHROME_YELLOW,
    rest: Colors.CARDINAL,
  };
  const COLOR = BAR_COLORS[mode];
  const CURRENT_MIN = minutes < 10 ? `0${minutes}` : minutes;
  const CURRENT_SEC = seconds < 10 ? `0${seconds}` : seconds;

  const [prepare, setPrepare] = useState(null);
  const [exercise, setExercise] = useState(null);

  const fetchLocalStorage = async (): Promise<void> => {
    const storage = await getData();
    const formattedstorage = storage?.map((item) => ({
      key: item[0],
      values: JSON.parse(item[1]),
    }));
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  return (
    <View style={styles.progressBarWrapper}>
      <CircleShape
        CURRENT_MIN={CURRENT_MIN}
        CURRENT_SEC={CURRENT_SEC}
        COLOR={COLOR}
      />
      <View style={{ marginTop: 15 }}>
        <Text style={[styles.label, { color: COLOR }]}>Exercitar</Text>
      </View>
    </View>
  );
};

const CircleShape = ({ CURRENT_MIN, CURRENT_SEC, COLOR }: any) => (
  <View style={[styles.circleShape, { backgroundColor: COLOR }]}>
    <View style={styles.innerCircleShape}>
      <View style={styles.timerWrapper}>
        <Text style={styles.timer}>{CURRENT_MIN}</Text>
        <Text style={styles.timer}>:</Text>
        <Text style={styles.timer}>{CURRENT_SEC}</Text>
      </View>
    </View>
  </View>
);

const CENTER_ITEM: any = {
  justifyContent: "center",
  alignItems: "center",
};
const CIRCLE_SIZE: number = 250;
const PADDING: number = 25;

const styles = StyleSheet.create({
  progressBarWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },
  circleShape: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    ...CENTER_ITEM,
  },
  innerCircleShape: {
    width: CIRCLE_SIZE - PADDING,
    height: CIRCLE_SIZE - PADDING,
    borderRadius: (CIRCLE_SIZE - PADDING) / 2,
    backgroundColor: Colors.WHITE,
    ...CENTER_ITEM,
  },
  timerWrapper: {
    flexDirection: "row",
  },
  timer: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_85,
    color: Colors.BLACK,
  },
  label: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_22,
    color: Colors.BLACK,
  },
});

export default CircularProgressBar;
