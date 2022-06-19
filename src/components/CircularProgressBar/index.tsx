import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AnimatedCircularProgress from "react-native-animated-circular-progress";
import { Colors, Font } from "../../styles";
import { Props } from "./types";
import { getData } from "../../services/localStorage";

const CircularProgressBar: FC<Props> = ({ duration, mode }) => {
  const BAR_COLORS: any = {
    Exercise: Colors.PRIMARY,
    Prepare: Colors.CHROME_YELLOW,
    Rest: Colors.CARDINAL,
  };
  const COLOR = BAR_COLORS[mode];

  const [durationWatch, setDurationWatch] = useState<number>(0);
  const [prepare, setPrepare] = useState(null);
  const [exercise, setExercise] = useState(null);

  const fetchLocalStorage = async (): Promise<void> => {
    const storage = await getData();
    const formattedstorage = storage?.map((item) => ({
      key: item[0],
      values: JSON.parse(item[1]),
    }));
    // console.log("formattedstorage: ", formattedstorage);
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setDurationWatch(durationWatch + 1000);
  //     }, 1000);

  //     console.log("durationWatch: ", durationWatch);

  //     if (durationWatch === duration) {
  //       clearInterval(interval);
  //       console.log("Progress Bar Completed");
  //     }
  //     return () => clearInterval(interval);
  //   }, [durationWatch]);

  return (
    <View style={styles.progressBarWrapper}>
      <AnimatedCircularProgress
        size={250}
        fill={100}
        innerRadius={85}
        backgroundWidth={10}
        lineCap="round"
        color={COLOR}
        duration={duration}
        backgroundColor="#b4b4b4"
      >
        <View style={styles.innerContainer}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>00</Text>
            <Text style={styles.timer}>:</Text>
            <Text style={styles.timer}>30</Text>
          </View>
        </View>
      </AnimatedCircularProgress>

      <View style={{ marginTop: 20 }}>
        <Text style={[styles.label, { color: COLOR }]}>Exercitar</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  progressBarWrapper: {
    alignItems: "center",
    marginBottom: 50,
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 90,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  timerWrapper: {
    flexDirection: "row",
  },
  timer: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_60,
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
