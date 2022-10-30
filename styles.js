import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
  
    button: {
      flex: 1,
      fontSize: 18,
      justifyContent: "center",
    },
  });