import { View, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../../constants/color/color'
import { Button, Text, TextInput } from 'react-native-paper'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import { decryptData, encryptData, generateKey } from '../../functions/AES';
import { CONFIG } from '../../../config/settings';
import { validateAccount } from '../../../config/db';
import { object, string, number, date, InferType } from 'yup';
import ROUTE from '../../../constants/route/route';
import { NavigationProp } from '@react-navigation/native';
import { setSignedInUserFromStorage } from '../../../store/local/storage';

type Props = {
    navigation: NavigationProp<any>
}

const Signin = ({navigation}: Props) => {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const proceedToUser = ()=>{
        setSignedInUserFromStorage({});
        navigation.reset({
            index: 0,
            routes: [{name: ROUTE.MAIN_HOME}]
        })
    } 

    // Somewhere in your code
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({ userInfo });

            proceedToUser()
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "can't login"
            });
            console.log(error, "error")
        }
    };

    const normalLogin = async ()=>{

        
        try {
            let userSchema = object({
                email: string().email().required(),
                password: string().min(6).required(),
            });
            
            // parse and assert validity
            const user = await userSchema.validate(input);
            
        } catch (error: any) {
            console.log(error)
            Toast.show({
                type: "error",
                text1: "Input validation",
                text2: error?.message
            });
            return ;
        }

        const key = await generateKey(CONFIG.APP_KEY_PASSWORD, CONFIG.APP_KEY_SALT, 256, 256);
        const userAuthText = `${input.email}:${input.password}`;
        
        const encryptedData = await encryptData(userAuthText, key);
        const isAuthenticated = await validateAccount(encryptedData)
        if(isAuthenticated){
            proceedToUser()
        }else{
            Toast.show({
                type: "error",
                text1: "Authentication Failed",
                text2: "invalid login credentials"
            });
        }
    }
    
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: Color.TEXT_P1, fontWeight: '600' }} variant='headlineMedium'>Welcome To Seyi-TFX</Text>
      <Text style={{ marginVertical: 16 }} variant='labelLarge'>Complete the sign in by providing your information</Text>

      <TextInput value={input.email} onChangeText={val => setInput({...input, email: val})} style={{ backgroundColor: 'white' }} theme={{ colors: {primary: Color.PRIMARY_LIGHT} }} mode='outlined' placeholder='Name' label={"Email"} />
      <Text>{'\n'}</Text>
      <TextInput value={input.password} onChangeText={val => setInput({...input, password: val})} style={{ backgroundColor: 'white' }} theme={{ colors: {primary: Color.PRIMARY_LIGHT} }} mode='outlined' placeholder='Name' label={"Password"} />
      <Text>{'\n'}</Text>
      <Button onPress={() => normalLogin()} mode='contained' theme={{ colors: {primary: Color.PRIMARY_LIGHT} }}>Login</Button>
      
      <Text>{'\n'}</Text>
      <Text style={{ textAlign: 'center' }}>OR</Text>
      <Text>{'\n'}</Text>
      <Button icon={"google"} onPress={() => signIn()} mode='contained' theme={{ colors: {primary: Color.TEXT_P1}, }}>Sign in with Google</Button>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
        disabled={false}
        />; */}

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50
    },
})


export default Signin