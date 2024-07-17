import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'

const AppStack = () => {


  type RootStackParamList = {
    Home: undefined
  }
  const Stack = createStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
        <Stack.Screen name= "Home" component= {Home} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})