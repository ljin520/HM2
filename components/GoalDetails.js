import { View, Text, Modal, Button} from 'react-native'
import React from 'react'

export default function GoalDetails({route}) {
  console.log("item pressed");
  console.log(route.params);
  return (

    <View>
      <Text>You are viewing details of goal</Text>
      <Button title='Mark as Important' onPress={()=>{}}/>
      <Button title='Delete' onPress={()=>{}}/>
    </View>

  )
}