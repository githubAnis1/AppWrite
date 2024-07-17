import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AppwriteContext from '../appwrite/AppwriteContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/AuthStack';
import { Popup } from 'react-native-popup-confirm-toast'

type SignUpProps = StackScreenProps<RootStackParamList,"SignUp">

const SignUp = ({navigation}: SignUpProps) => {

  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [formData, setFormData] = useState<RegisterUserAccount>({name:'',email:'',password:'',confirmPassword:''})
  const [errors, setErrors] = useState<any>({});
  const nameInputRef = useRef(null) //to Focus on

  const handelInputChange = (key:string, value:string) => setFormData({...formData, [key]:value})

  const validateForm = () :boolean => {
    const newErrors:any = {}

     if (!formData?.name) {
      newErrors.name = "Please enter name";
      setErrors(newErrors); 
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = "Please enter a valid email like 'name@domain.com'";
      setErrors(newErrors); 
      return;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(formData?.password)){
      newErrors.password = "Password must contain at least 8 characters, including uppercase letters, lowercase letters, and numbers."
      setErrors(newErrors); 
      return;
    } else if(formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Password doesn't confirmed correctly";
      setErrors(newErrors); 
      return;
    } else {
      setErrors({})
    }

    Object.keys(errors).length === 0 ? "validated" : "form doesn't validated"
    return Object.keys(errors).length === 0; //true if no errors
  }

  const handelSingUp = async () => {
    if (validateForm()) {
      const response = await appwrite.createAcount(formData);
      if (response) {
        setIsLoggedIn(true)
      }
    }
  }

  useEffect(()=> {
    // Focus on the'name' input when the component mounts
    nameInputRef.current.focus()
  },[])
  
  
  return (

    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        >
      <View style={styles.formContainer}>
          {/* Name */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData?.name}
            onChangeText={(value) => handelInputChange('name',value)}
            ref={nameInputRef}
          />
          {/* Email */}
          <TextInput
            keyboardType='email-address'
            style={styles.input}
            placeholder="Email"
            value={formData?.email}
            onChangeText={(value) => handelInputChange('email',value)}
          />
          {/* Password */}
          <TextInput
            secureTextEntry
            placeholder="Password"
            value={formData?.password}
            onChangeText={(value) => handelInputChange('password',value)}
            placeholderTextColor={'#AEAEAE'}
            style={styles.input}
          />
          {/* Repeat password */}
          <TextInput
            secureTextEntry
            value={formData?.confirmPassword}
            onChangeText={(value) => handelInputChange('confirmPassword',value)}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Confirm Password"
            style={styles.input}
          />

          {/* Validation error */}
          {Object.keys(errors).map((key) => (
              <Text key={key} style={styles.errorText}>{errors[key]}</Text>
            ))}

          {/* SingUp Btn */}
          <TouchableOpacity
            style={styles.btn}
            onPress={handelSingUp}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>

          {/* SignIn navigation */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={styles.loginContainer}>
            <Text style={styles.haveAccountLabel}>
              Already have an account?
              <Text style={styles.loginLabel}> Login</Text>
            </Text>
          </TouchableOpacity>
      </View>
  </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    color: '#000',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    textAlign:"center",
    color: 'red',
    marginTop: 10,
    marginHorizontal:40
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
})