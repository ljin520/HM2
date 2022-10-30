import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import { firestore } from "../firebase/firebase-setup";
import { uid } from "uid";
import { useState } from "react";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { styles } from "../styles";

export default function CreatePostScreen({ navigation, route }) {
  const [text, setPostText] = React.useState("");
  const [money, setMoney] = useState(0);
  const importance = route.params.importance;

  const wirteToDatabase = async function (text, money) {
    try {
      const id = uid();
      const key = Math.random();
      await addDoc(collection(firestore, "goals"), {
        importance,
        text,
        key,
        money,
        id,
      });
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("All Expenses");
  };
  function Warning() {
    Alert.alert("Invalid input!", "please check your values");
  }

  function sanitise(x) {
    if (isNaN(x)) {
      return NaN;
    }
    return x;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.center}>
        <Text styles={styles.title}> Your Expenses</Text>

        <TextInput
          style={styles.textContainer}
          title="money"
          multiline
          placeholder="Input Your money"
          value={money}
          onChangeText={(money) => {
            setMoney(money);
          }}
        />

        <TextInput
          style={styles.textContainer}
          multiline
          placeholder="What's your money used for?"
          value={text}
          onChangeText={setPostText}
        />

        <Button
          title="Cancel"
          onPress={() => navigation.navigate("All Expenses")}
        />

        <Button
          title="Submit"
          onPress={() => {
            (sanitise(money) == money) &
            (parseInt(money) > 0) &
            (text.length > 1)
              ? wirteToDatabase(text, money)
              : Warning();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
