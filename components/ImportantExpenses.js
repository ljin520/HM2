import { Pressable, Text, View, FlatList } from "react-native";
import { firestore } from "../firebase/firebase-setup";
import { useState, useEffect } from "react";
import React from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { styles } from "../styles";

export default function ImportantExpenses({ navigation}) {
  const [mygoals, setMyGoals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "goals"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setMyGoals([]);
          return;
        }
        setMyGoals(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, id: snapDoc.id };
            return data;
          })
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={mygoals}
        renderItem={({ item }) => {
          // console.log(item)
          return item.importance == 1 ? (
            <Pressable
              onPress={() => {
                navigation.navigate("Edit Expenses", { item });
              }}
              android_ripple={{ color: "black", foreground: true }}
              style={(obj) => {
                return obj.pressed && styles.pressedItem;
              }}
            >
              <View style={styles.goalTextContainer}>
                <Text style={styles.goalText}>{item.text}</Text>

                <Text style={styles.goalText}>{item.money}</Text>
              </View>
            </Pressable>
          ) : null;
        }}
      ></FlatList>
    </View>
  );
}
