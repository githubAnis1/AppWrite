import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'


export type RootStackParamList = {
  SignIn : undefined,
  SignUp : undefined
}

const AuthStack = () => {

  const Stack = createStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
        <Stack.Screen name= "SignIn" component= {SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name= "SignUp" component= {SignUp} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default AuthStack
