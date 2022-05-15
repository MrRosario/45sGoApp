import React, { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Font } from "../../styles";

import ClockIcon from "../../../assets/icons/Clock.svg";
import ArrowRightIcon from "../../../assets/icons/Arrow_right.svg";
import RoundIcon from "../../../assets/icons/Rounds.svg";

type Props = {
  type: string;
  title: string;
  time: string;
  callback: (title: string) => void;
};
const Card: FC<Props> = ({ type, title, time, callback }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => callback(title)}>
      {type !== "rounds" ? <ClockIcon /> : <RoundIcon />}

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <ArrowRightIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderColor: "#A3A3A3",
    backgroundColor: "#E9E9E9",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontFamily: Font.FAMILY.MEDIUM,
    fontWeight: Font.WEIGHT.MEDIUM,
    fontSize: Font.SIZE.SIZE_18,
    color: "#484848",
  },
  time: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_20,
    color: "#A3A3A3",
  },
});

export default Card;
