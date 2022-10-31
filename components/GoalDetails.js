import { View, Button, Alert, SafeAreaView } from "react-native";
import { firestore } from "../firebase/firebase-setup";
import React from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { styles } from "../styles";

export default function GoalDetails({ navigation, route }) {
  const cur = route.params.item;

  const updateImportant = async function () {
    Alert.alert(
      "Important",
      "Are you sure you want to mark this as inmportant?",
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "YES",
          onPress: () => {
            navigation.navigate("Back");
            updateDoc(
              doc(firestore, "goals", `${cur.id}`),
              { importance: 1 },
              { merge: true }
            );
            console.log("edit ");
          },
        },
      ]
    );
  };

  const delGoal = async function () {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      {
        text: "No",
        onPress: () => {},
      },
      {
        text: "YES",
        onPress: () => {
          deleteDoc(doc(firestore, "goals", `${cur.id}`));
          console.log("delte");
          navigation.navigate("Back");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          style={styles.bouttonContainer}
          title="Mark as Important"
          onPress={() => {
            updateImportant({ cur });
          }}
        />

        <Button
          style={styles.bouttonContainer}
          title="Delete"
          onPress={() => {
            delGoal({ cur });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
