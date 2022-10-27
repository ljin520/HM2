
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TextInput, View,Button,Modal } from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import Input from './components/Input';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home  from './components/Home';
import GoalDetails from './components/GoalDetails';
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// function Add({ navigation,route }) {
//   const [goals, setGoals] = useState([]);
//   const updateGoals = function (newinf) {
//     const newGoal = { text: newinf.money, key: newinf.key };
//     setGoals((prevgoals) => {
//       return [...prevgoals, newGoal];
//     });
//   };
//   console.log("add expenses")

//   React.useEffect(() => {
//     if (route.params?.post) {
//       updateGoals(route.params.user)
//     }
//   }, [route.params?.post]);
//   const dataToShow = goals.map((x) => <View><Text style={styles.textContainer}>{x}</Text></View>);

//   console.log(route.params)
//   console.log(route.params.user)
//   console.log(route.params.user.key)
//   console.log(route.params.user.money)
//   console.log(dataToShow)
//   return(
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//         title="Create post"
//         onPress={() => navigation.navigate('CreatePostScreen',)}
//       />
//       <Text style={{ margin: 10 }}>Post: {dataToShow} </Text>
//       </View>
//   );
// }

function AllExpenses({ navigation }) {
  return (
    <Home/>
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    // </View>
  );
}

function ImportantExpenses({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function HomeTabs({ navigation }){
  return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'All Expenses') {
                  iconName = focused ? 'logo-usd': 'play-skip-forward-outline';
                } else if (route.name === 'Important Expenses') {
                  iconName = focused ? 'logo-yen' : 'play-skip-back-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },

              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'gray',
              headerStyle: { backgroundColor: "#995099" },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
            })}
        >
          <Tab.Screen name="All Expenses" 
                      component={AllExpenses}                 
                      options={{
                          headerRight: () => (
                          <Button
                              onPress={() => navigation.navigate('Home')}
                              title="+"
                              color="#000"
                          />),}}
          />
          <Tab.Screen 
                name="Important Expenses" 
                component={ImportantExpenses}     
                options={{
                  headerRight: () => (
                  <Button
                      onPress={() => navigation.navigate('Home')}
                      title= "+"
                      color="#000"
                  />),
                }}
          />
        </Tab.Navigator>
  );
}


function CreatePostScreen({ navigation, route}) {
  const [postText, setPostText] = React.useState('');
  const [money,setMoney] = useState(0);

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <TextInput
          multiline
          style={styles.input}
          value={money}

          onChangeText={(money) => {
            setMoney(money);
          }}
          style1={{ height: 200, padding: 10, backgroundColor: 'white' }}
          placeholder="Input Your money"
        />
      <Button 
                      title="Cancel" 
                      onPress={()=>navigation.navigate('All Expenses')}
      />

      <Button
        title="Submit"
        onPress={() => navigation.navigate('Home',{user: {
          key: postText,
          money: money,
        },})}
      />
    </>
  );
}


function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Important Expense':
      return 'Important Expense';
    case 'All Expenses':
      return 'All Expenses';
  }
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator >

        <Stack.Screen 
            name="Back" 
            component={HomeTabs} 
            options={({ route } ) => ({
                    headerTitle: getHeaderTitle(route),
                    headerShown: false,
                    headerRight: () => (
                      <Button
                          onPress={() => navigation.navigate('AddExpenses')}
                          title= "+"
                          color="#000"
                      />),
            })}
      />
        {/* <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    title: "All Goals",
                  }}
        />
        <Stack.Screen name = "AddExpenses" component={Input}/>

        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route, navigation }) => {
            console.log(route)
            return {
              title: route.params,
              headerRight: rightButton,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer:{
    backgroundColor: "#aaa",
    borderRadius: 5,
    color: "blue",
    padding: 30,
    margin: 30,
  }
});
