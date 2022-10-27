import { View, Text, Modal} from 'react-native'
import React from 'react'

export default function GoalDetails({route}) {
  console.log(route.params.goalObject.text)
  return (
    // <Modal visible={modal1}>
    <View>
      <Text>You are viewing details of {route.params.goalObject.text} goal</Text>
    </View>
    // </Modal>
  )
}