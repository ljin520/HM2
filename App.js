import { Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AllExpenses from "./components/AllExpenses";
import ImportantExpenses from "./components/ImportantExpenses";
import CreatePostScreen from "./components/CreatePostScreen";
import GoalDetails from "./components/GoalDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs({ navigation, route }) {
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
              onPress={() => {
                navigation.navigate("AddExpenses", { importance: 2 });
              }}
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
              onPress={() => {
                navigation.navigate("AddExpenses", { importance: 1 });
              }}
              title="+"
              color="#000"
            />
          ),
        }}
      />
    </Tab.Navigator>
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
