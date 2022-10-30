import { Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

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
