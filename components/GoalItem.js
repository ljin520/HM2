import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";

import DeleteButton from "./DeleteButton";

export default function GoalItem({ goal, onDelete, onItemPress }) {
  function deletePressed() {
    onDelete(goal.key);
  }
  return (
    <View style={styles.goalTextContainer}>
      <Pressable
        onPress={() => {
          onItemPress(goal);
        }}
        android_ripple={{ color: "#223355", foreground: true }}
        style={(obj) => {
          return obj.pressed && styles.pressedItem;
          //  style={({pressed}) => {
          //   return pressed && styles.pressedItem;
        }}
      >
        <Text style={styles.goalText}> {goal.text} </Text>
      </Pressable>
      <DeleteButton onDeletePressed={deletePressed} />
    </View>
  );
}

const styles = StyleSheet.create({
  goalTextContainer: {
    margin: 8,
    borderRadius: 5,
    backgroundColor: "#aaa",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  goalText: {
    fontSize: 18,
    color: "#929",
    // backgroundColor:'#aaa',
    padding: 8,
  },
  pressedItem: {
    backgroundColor: "#222",
    opacity: 0.5,
  },
});