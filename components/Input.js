import {
  View,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function Input({onAdd, modal, onCancel }) {
  const [text, setText] = useState("");
  return (
    <Modal visible={modal} statusBarTranslucent={true}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(newText) => {
            setText(newText);
          }}
          placeholder="Type something"
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} />
          </View>
          <View style={styles.button}>
            <Button
              title="Confirm"
              onPress={() => {
                onAdd(text);
                setText("");
              }}
              disabled={text.length? false: true}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "#ff00ff",
    borderBottomWidth: 2,
    borderBottomColor: "purple",
    // borderBottomStyle:'solid'
    margin: 5,
  },
  button: {
    margin: 5,
    width:'30%'
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonsContainer:
  {
    flexDirection:'row'
  }
});