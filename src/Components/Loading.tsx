import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {

  return (
    <View style={styles.Container}>
      <ActivityIndicator size="large" color="#1d9bf0" />
    </View>
  )
  
}

export default Loading

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    width :"100%"
  },
})