import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import AppwriteContext from '../appwrite/AppwriteContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/AuthStack';
import { Toast } from 'react-native-popup-confirm-toast';




type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>

const SignIn = ({navigation}: SignInScreenProps) => {

    const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)
    const [formData,setFormData] = useState<LoginUserAccount>({email:'', password:''})
    const [errors,setErrors] = useState<any>({});
    const [loading , setLoading] = useState<boolean>()


    const handelInputChange = (key:string, value:string)=> setFormData({...formData, [key]: value})
    
    const validateForm = () :boolean  => {
      const newErrors: any = {};

      if (!formData?.email) {
        newErrors.email = "Please enter email";
        setErrors(newErrors)
        return;
      } else if (!formData?.password) {
        newErrors.password = "Please enter password"
        setErrors(newErrors)
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
        newErrors.emailform = "Please enter a valid email like 'name@domain.com'";
        setErrors(newErrors)
        return;
      } else {
        setErrors({})
      }
      Object.keys(errors).length === 0 ? console.log(errors,"validated") : console.log(errors,"enable to valid form")
      return  Object.keys(errors).length === 0 ; //true if no errors
    }

    const handelLogin =  async () => {
      if (validateForm()) {
        setLoading(false)
        const response = await appwrite.login(formData);
        if (response) {
          setIsLoggedIn(true)
        } else {
          Toast.show({
            title: 'Oops !',
            text: 'email or password incorrect',
            backgroundColor: '#702c91',
            timeColor: '#440f5f',
            timing: 3000,
            position: 'top',
            statusBarType:'dark-content',
          });
        }
        setLoading(false)
      }
    }
    
  return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: "#ddd" }]}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
              <Text style={styles.appName}>Appwrite Auth</Text>
    
              {/* Email */}
              <TextInput
                keyboardType='email-address'
                style={styles.input}
                value={formData?.email}
                onChangeText={(value) => handelInputChange('email',value)}
                placeholderTextColor={'#AEAEAE'}
                placeholder="Email"
              />
  
              {/* Password */}
              <TextInput
                style={styles.input}
                value={formData?.password}
                onChangeText={(value) => handelInputChange('password',value)}
                placeholderTextColor={'#AEAEAE'}
                placeholder="Password"
                secureTextEntry
              />
              {/* Validation error */}
              {Object.keys(errors).map((key) => (
                <Text key={key} style={styles.errorText}>{errors[key]}</Text>
              ))}
  
              {/* Login btn */}
              <TouchableOpacity
                onPress={ handelLogin}
                style={[styles.btn, {marginTop: errors ? 10 : 20}]}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            
              {/* Sign up navigation */}
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signUpContainer}>
                <Text style={styles.noAccountLabel}>
                  Don't have an account ?
                  <Text style={styles.signUpLabel}> Create an account</Text>
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  ) 
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: '#FFFFFF', */
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
    color: '#000000',

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
    color: 'red',
    textAlign:'center',
    marginTop: 10,
    marginHorizontal:50
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

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
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
})