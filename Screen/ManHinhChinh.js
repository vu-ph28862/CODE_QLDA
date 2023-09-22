import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ManHinhChinh() {
  return (
    <View style={styles.container}>
      <Text>ManHinhChinh</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"center"
  },
})