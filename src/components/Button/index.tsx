import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Colors, Font } from "../../styles";

type Props = {
  title: string;
  size: string;
  outline?: boolean;
  isPaused?: boolean;
  callBack?: () => void;
};

const Button: FC<Props> = ({ size, title, outline, isPaused, callBack }) => {
  const outLineStyle = {
    container: {
      backgroundColor: "transparent",
      borderColor: Colors.GREY._,
      borderWidth: 1,
    },
    label: {
      textAlign: "center",
      fontFamily: Font.FAMILY.REGULAR,
      fontWeight: Font.WEIGHT.REGULAR,
      fontSize: Font.SIZE.SIZE_22,
      color: Colors.BLACK,
    },
  };
  return (
    <TouchableOpacity
      onPress={callBack}
      style={[
        styles.button,
        outline && outLineStyle.container,
        size !== "large" ? styles.small : styles.large,
        isPaused && { backgroundColor: Colors.CARDINAL },
      ]}
    >
      <Text style={[styles.label, outline && outLineStyle.label]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ED1C24",
    width: "100%",
  },
  label: {
    color: "#ffffff",
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_22,
  },
  large: {
    position: "absolute",
    bottom: 0,
  },
  small: {
    width: 135,
    borderRadius: 4,
  },
});

export default Button;
