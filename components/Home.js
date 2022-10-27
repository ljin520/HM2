import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import Input from "./Input";
import { useState } from "react";
import GoalItem from "./GoalItem";
import GoalDetails from "./GoalDetails";
// import { writeToDB} from '../firebase/firestore';
// import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';



export default function Home({navigation}) {
  const [goals, setGoals] = useState([]);
  // goals =[{text:'learn', key:random_number}]
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(firestore, "goals"),
  //     (querySnapshot) => {
  //       if (querySnapshot.empty) {
  //         setGoals([]);
  //         return;
  //       }
  //       setGoals(
  //         querySnapshot.docs.map((snapDoc) => {
  //           let data = snapDoc.data();
  //           data = { ...data, key: snapDoc.id };
  //           return data;
  //         })
  //       );
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);


  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const onTextAdd = function (newText) {
    const newGoal = { text: newText, key: Math.random() };
    setGoals((prevgoals) => {
      return [...prevgoals, newGoal];
    });
    // writeToDB({ text: newText });
    setModalVisible(false);
  };
  const makeModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  const makeInVisible = () => {
    setVisible(!visible);
  };

  async function onDelete(deletedKey) {
    console.log("delete pressed ", deletedKey);
    setGoals(
      goals.filter((goal) => {
        return goal.key != deletedKey;
      })
    );
    // await deleteFromDB(deletedKey);
  }

  function itemPressed(goal) {
    console.log("item pressed");
    //navigate to GoalDetails.js
    ()=> navigation.navigate('GoalDetails',{goalObject:goal});
    // <GoalDetails/>;

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={makeModalVisible} />
      </View>

      <View style={styles.bottomContainer}>
        <FlatList
          data={goals}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <GoalItem
                goal={item}
                onDelete={onDelete}
                onItemPress={itemPressed}
              />
            );
          }}
          contentContainerStyle={styles.scrollViewItems}
        ></FlatList>
      </View>
      <Input
        modal={modalVisible}
        onCancel={makeModalVisible}
        onAdd={onTextAdd}
      />

      {/* <GoalDetails
        modal1={visible}
        Cancel={makeInVisible}
      /> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer:{
    flexDirection:  "row-reverse",
    backgroundColor: "#995099",
    color:"#000",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "pink",
  },
  scrollViewItems: {
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    color: "blue",
    padding: 30,
    margin: 30,
  },
  text: { fontSize: 12 },
});