import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { storeData } from "../../services/localStorage";
import { fortyFiveSgo } from "../../resources/constants";
import { Colors, Font } from "../../styles";

type Props = {
  modalTitle: string;
  modalType: string;
  rounds?: string;
  min: string;
  sec: string;
  setIsModalVisible: (isVisible: boolean) => void;
};
const TimerEditor: FC<Props> = ({
  modalTitle,
  modalType,
  rounds,
  min,
  sec,
  setIsModalVisible,
}) => {
  const [values, setValues] = useState({});
  const [inputValue, setInputValue] = useState<string>("");
  const [inputType, setInputType] = useState<string>("");
  const [timeMin, setTimeMin] = useState<string>(min);
  const [timeSec, setTimeSec] = useState<string>(sec);
  const [key, setKey] = useState(() => {
    switch (modalType) {
      case "prepare":
        return fortyFiveSgo.prepare;
      case "exercise":
        return fortyFiveSgo.exercise;
      case "rest":
        return fortyFiveSgo.rest;
      default:
        return fortyFiveSgo.rounds;
    }
  });

  const closeModal = () => setIsModalVisible(false);

  const onSave = (type: string): void => {
    if (type !== "confirm") {
      closeModal();
      return;
    }

    storeData({ key, values });
    closeModal();
  };

  const renderInputs = () => {
    if (modalType == "rounds") {
      return (
        <View>
          <Input
            title="rodadas"
            setInputValue={setInputValue}
            setInputType={setInputType}
            setTimeMin={setTimeMin}
            setTimeSec={setTimeSec}
            inputType="rounds"
            defaultValue={rounds}
            maxLength={1}
          />
        </View>
      );
    }

    return (
      <View style={styles.innerContainer}>
        <Input
          title="minutos"
          setInputValue={setInputValue}
          setInputType={setInputType}
          setTimeMin={setTimeMin}
          setTimeSec={setTimeSec}
          inputType="min"
          defaultValue={min}
          maxLength={2}
        />
        <Text style={styles.dots}>:</Text>
        <Input
          title="segundos"
          setInputValue={setInputValue}
          setInputType={setInputType}
          setTimeMin={setTimeMin}
          setTimeSec={setTimeSec}
          inputType="sec"
          defaultValue={sec}
          maxLength={2}
        />
      </View>
    );
  };

  useEffect(() => {
    if (modalType === "rounds") {
      setValues({
        rounds: inputValue,
        type: modalType,
        title: modalTitle,
      });
      return;
    }

    if (timeMin.length < 2 || timeSec.length < 2) return;

    inputType === "sec"
      ? setValues({
          min: timeMin,
          sec: timeSec,
          type: modalType,
          title: modalTitle,
        })
      : setValues({
          min: timeMin,
          sec: timeSec,
          type: modalType,
          title: modalTitle,
        });
  }, [timeMin, timeSec, inputValue]);

  return (
    <View style={styles.overlay}>
      <View style={styles.editorContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{modalTitle}</Text>
        </View>
        <View style={styles.body}>{renderInputs()}</View>
        <View style={styles.buttonWrapper}>
          <Button title="Cancelar" type="cancel" callback={onSave} />
          <Button title="OK" type="confirm" callback={onSave} />
        </View>
      </View>
    </View>
  );
};

const Input: FC = ({
  title,
  setInputValue,
  setInputType,
  defaultValue,
  inputType,
  setTimeMin,
  setTimeSec,
  maxLength,
}: any) => {
  const [number, setNumber] = React.useState<string>(defaultValue);

  const setDefaultInputValue = (val: string): string => {
    if (inputType !== "rounds") {
      return val !== "" ? val : "00";
    } else {
      return val !== "" ? val : "1";
    }
  };

  const handleValues = (val: string): void => {
    setNumber(val);
    setInputType(inputType);

    if (inputType === "sec") setTimeSec(setDefaultInputValue(val));
    else if (inputType === "min") setTimeMin(setDefaultInputValue(val));
    else setInputValue(setDefaultInputValue(val));
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(value: any) => handleValues(value)}
        value={number.toString()}
        keyboardType="number-pad"
        maxLength={maxLength}
        placeholder={title !== "rodadas" ? "00" : "1"}
        textAlign="center"
      />
      <Text style={styles.inputTitle}>{title}</Text>
    </View>
  );
};

const Button: FC = ({ title, type, callback }: any) => (
  <TouchableOpacity
    onPress={() => callback(type)}
    style={[
      styles.button,
      type !== "confirm" ? styles.cancelbutton : styles.confirmButton,
    ]}
  >
    <Text
      style={[
        styles.buttonTitle,
        type === "confirm" && styles.buttonConfirmTitle,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.BALCK_OPAQUE,
    alignItems: "center",
    position: "absolute",
  },
  editorContainer: {
    width: "90%",
    height: 220,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BALCK_OPAQUE,
    borderWidth: 1,
    marginTop: 40,
    borderRadius: 6,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 30,
  },
  header: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Font.FAMILY.REGULAR,
    fontWeight: Font.WEIGHT.REGULAR,
    fontSize: Font.SIZE.SIZE_20,
    color: Colors.BLACK,
  },
  body: {
    backgroundColor: Colors.LIGHT_RED,
    borderBottomColor: Colors.BALCK_OPAQUE,
    borderTopColor: Colors.BALCK_OPAQUE,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
  },
  dots: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_20,
    color: Colors.BLACK,
    marginHorizontal: 15,
    alignSelf: "center",
    position: "relative",
    top: -5,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    width: 55,
    height: 50,
    paddingHorizontal: 5,
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
    fontSize: Font.SIZE.SIZE_20,
    color: Colors.BLACK,
  },
  inputTitle: {
    fontFamily: Font.FAMILY.REGULAR,
    fontWeight: Font.WEIGHT.REGULAR,
    fontSize: Font.SIZE.SIZE_12,
    color: Colors.BLACK,
    alignSelf: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  cancelbutton: {
    borderBottomLeftRadius: 6,
  },
  confirmButton: {
    borderBottomRightRadius: 6,
    borderLeftWidth: 1,
    borderLeftColor: Colors.BALCK_OPAQUE,
  },
  buttonTitle: {
    fontFamily: Font.FAMILY.LIGHT,
    fontWeight: Font.WEIGHT.LIGHT,
    fontSize: Font.SIZE.SIZE_18,
    color: Colors.BLACK,
  },
  buttonConfirmTitle: {
    fontFamily: Font.FAMILY.BOLD,
    fontWeight: Font.WEIGHT.BOLD,
  },
});

export default TimerEditor;
