import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import Loading from '../Components/Loading'
import AppwriteContext from '../appwrite/AppwriteContext'



const Router = () => {

    const [loading,setLoading] = useState(true)
    const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext)

    useEffect(()=> {
        appwrite.getCurrentUser()
        .then((response)=> {
            setLoading(true)
            if (response) {
                setIsLoggedIn(true)
                setLoading(false)
            } else {
                setLoading(false)
            }
        }).catch(_=> {
            setLoading(false)
            setIsLoggedIn(false)
        })
    }, [appwrite, setIsLoggedIn])

    if (loading) {
        return  <Loading/>
    }
    
  return (
    
        <NavigationContainer>
            {isLoggedIn ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
  )
}

export default Router

