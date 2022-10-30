import {
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  SafeAreaView,
  FlatList,
} from "react-native";
import { firestore } from "./firebase/firebase-setup";
import { uid } from "uid";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";


import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AllExpenses({ navigation }) {
  const ref = collection(firestore, "goals");
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
  // const getgoals = () => {
  //   onSnapshot(ref, (querySnapshot) => {
  //     const item = [];
  //     querySnapshot.docs.map((element) => {
  //       item.push(element.data());
  //     });
  //     setMyGoals(item);
  //   });
  // };

  // useEffect(() => getgoals()), [];

  return (
    <View>
       <FlatList
          data={mygoals}
          renderItem={({ item }) => {
            // console.log(item)
            return (
               <Pressable
                  onPress={() => {
                    navigation.navigate("Edit Expenses",{item});
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
            );
          }}
        ></FlatList>
    </View>
  );
}

function ImportantExpenses({ navigation,route }) {
  const ref = collection(firestore, "goals");
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
            // console.log("^^^^^^")
            // console.log(data,snapDoc.id)
            return data;
          })
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // const getgoals = () => {
  //   onSnapshot(ref, (querySnapshot) => {
  //     const item = [];
  //     querySnapshot.docs.map((element) => {
  //       item.push(element.data());
  //     });
  //     setMyGoals(item);
  //   });
  // };

  // useEffect(() => getgoals()), [];
  
  return (
    <View>
        <FlatList
          data={mygoals}
          renderItem={({ item }) => {
            // console.log(item)
            return (
               (item.importance == 1?
                <Pressable
                  onPress={() => {
                    navigation.navigate("Edit Expenses",{item});
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
                </Pressable>:null)
              
            );
          }}
        ></FlatList>

    </View>
  );
}

function HomeTabs({ navigation, route }) {
  // console.log(route.params)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "All Expenses") {
            iconName = focused ? "logo-usd" : "play-skip-forward-outline";
          } else if (route.name === "Important Expenses") {
            iconName = focused ? "logo-yen" : "play-skip-back-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: "#995099" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          headerRight: () => (
            <Button
              onPress={() => 
                { navigation.navigate("AddExpenses", { importance: 2})}}
              title="+"
              color="#000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Important Expenses"
        component={ImportantExpenses}
        options={{
          headerRight: () => (
            <Button
              onPress={() => 
                {navigation.navigate("AddExpenses", { importance:1 })}}
              title="+"
              color="#000"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function CreatePostScreen({ navigation, route }) {
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
      console.log("good to do");
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("All Expenses")
  };
  function Warning() {
    Alert.alert(
      'Invalid input!', 'please check your values',
    );
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
            sanitise(money) == money & parseInt(money) > 0 &  text.length > 1 ? 
            wirteToDatabase(text, money): Warning()

          }}
        />
      </View>
    </SafeAreaView>
  );
}

function GoalDetails({ navigation,route }) {
  const cur = route.params.item;
  console.log(cur.id)
  const updateImportant = async function () {
    Alert.alert(
      "Important", 
      "Are you sure you want to mark this as inmportant?", [
      {
        text: "No",
        onPress: () => {},
      },
      {
        text: "YES",
        onPress: () => { 
          navigation.navigate("Back");
          updateDoc(doc(firestore, "goals", `${cur.id}`), { importance: 1}, { merge: true });
          console.log("edit ")}
      },
    ])
  };

  const delGoal = async function () {
    Alert.alert(
      "Delete", 
      "Are you sure you want to delete this?", [
      {
        text: "No",
        onPress: () => {},
      },
      {
        text: "YES",
        onPress: () => {
          
            deleteDoc(doc(firestore, "goals", `${cur.id}`));
            // remove(doc(firestore, "goals", `${cur.key}`));
            console.log("delte")
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
            updateImportant({cur});
          }}
        />

        <Button
          style={styles.bouttonContainer}
          title="Delete"
          onPress={() => {
            delGoal({cur});
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  switch (routeName) {
    case "Important Expense":
      return "Important Expense";
    case "All Expenses":
      return "All Expenses";
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={HomeTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="AddExpenses"
          component={CreatePostScreen}
          options={{
            headerStyle: { backgroundColor: "#995099" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="Edit Expenses"
          component={GoalDetails}
          options={{
            headerStyle: { backgroundColor: "#995099" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },

  title: {
    justifyContent: "center",
    color: "blue",
  },

  center: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  goalTextContainer: {
    margin: 15,
    borderRadius: 8,
    backgroundColor: "#aaa",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  bouttonContainer: {
    margin: 5,
    width: "30%",
    flexDirection: "row",
  },

  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    color: "blue",
    padding: 30,
    margin: 30,
  },

  pressedItem: {
    backgroundColor: "#222",
    opacity: 1,
  },
});
