import React, { FC } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors, Font } from "../../styles";

type Props = {
  modalTitle: string;
  setIsModalVisible: (isVisible: boolean) => void;
};
const TimerEditor: FC<Props> = ({ modalTitle, setIsModalVisible }) => {
  const closeModal = () => setIsModalVisible(false);

  const onSave = (type: string): void => {
    if (type !== "confirm") {
      closeModal();
      return;
    }

    //CONFIRM....
    console.log("Botao OK");
    closeModal();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.editorContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{modalTitle}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.innerContainer}>
            <Input title="minutos" />
            <Text style={styles.dots}>:</Text>
            <Input title="segundos" />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cancelar" type="cancel" callback={onSave} />
          <Button title="OK" type="confirm" callback={onSave} />
        </View>
      </View>
    </View>
  );
};

const Input: FC = ({ title, onChangeNumber, value }: any) => (
  <View>
    <TextInput
      style={styles.input}
      onChangeText={onChangeNumber}
      value={value}
      keyboardType="number-pad"
      maxLength={2}
      placeholder="00"
      textAlign="center"
    />
    <Text style={styles.inputTitle}>{title}</Text>
  </View>
);
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
