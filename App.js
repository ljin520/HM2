import {
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  SafeAreaView,
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

  const getgoals = () => {
    onSnapshot(ref, (querySnapshot) => {
      const item = [];
      querySnapshot.docs.map((element) => {
        item.push(element.data());
      });
      setMyGoals(item);
    });
  };

  useEffect(() => getgoals()), [];

  return (
    <View>
      {mygoals.map((goal) => (
        <Pressable
          onPress={() => {
            navigation.navigate("Edit Expenses");
          }}
          android_ripple={{ color: "black", foreground: true }}
          style={(obj) => {
            return obj.pressed && styles.pressedItem;
          }}
        >
          <View style={styles.goalTextContainer}>
            <Text style={styles.goalText}>{goal.text}</Text>
            <Text style={styles.goalText}>{goal.money}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

function ImportantExpenses({ navigation }) {
  const ref = collection(firestore, "goals");
  const [mygoals, setMyGoals] = useState([]);

  const getgoals = () => {
    onSnapshot(ref, (querySnapshot) => {
      const item = [];
      querySnapshot.docs.map((element) => {
        item.push(element.data());
      });
      setMyGoals(item);
    });
  };

  useEffect(() => getgoals()), [];

  return (
    <View>
      {mygoals.map((goal) =>
        goal.importance == 1 ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Edit Expenses");
            }}
            android_ripple={{ color: "black", foreground: true }}
            style={(obj) => {
              return obj.pressed && styles.pressedItem;
            }}
          >
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalText}>{goal.text}</Text>

              <Text style={styles.goalText}>{goal.money}</Text>
            </View>
          </Pressable>
        ) : null
      )}
    </View>
  );
}

function HomeTabs({ navigation, route }) {
  const [goals, setGoals] = useState([]);
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
              onPress={() => navigation.navigate("AddExpenses", { goals })}
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
              onPress={() => navigation.navigate("AddExpenses", { goals })}
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
  // console.log(route.params);

  const wirteToDatabase = async function (text, money) {
    try {
      const key = uid();
      const importance = 2;
      addDoc(collection(firestore, "goals"), {
        importance,
        text,
        key,
        money,
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

function GoalDetails({ navigation, route }) {
  const cur = route.params;
  const text = "";
  const updateImportant = async function (cur) {
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
        setDoc(doc(firestore, "goals", `${cur.id}`), { importance: "1" }, { merge: true }),
        navigation.navigate("Back");}
      },
    ]);
  };

  const delGoal = async function (cur) {

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
          try {
            deleteDoc(doc(firestore, "goals", `${cur.id}`));
          } catch (err) {
            console.log(err);
          }
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
            updateImportant(cur);
            console.log(text)
            text=="YES" ? navigation.navigate("Back"):null;
          }}
        />

        <Button
          style={styles.bouttonContainer}
          title="Delete"
          onPress={() => {
            delGoal(cur);
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
