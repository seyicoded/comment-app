import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import SplashScreen from './src/screens/splash/SplashScreen';
import {Provider as PaperProvider, ActivityIndicator, Text, DefaultTheme, MD3LightTheme, Card} from 'react-native-paper'
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from './src/store/redux/store';
import MainStack from './src/navigations/MainStack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function App(): React.JSX.Element {

  const [ showSplash, setShowSplash ] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setShowSplash(false)
    }, 5000)
  }, [])

  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '260418163369-ssb5rs8merqqlqftvudbeqitoigma5tg.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.    
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '260418163369-etlgg8eu6ea6do9fiji1ndj21am0eq7u.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });

  if(showSplash){
    return (<SplashScreen />)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <PaperProvider theme={{ ...MD3LightTheme, dark: false }}>
      <ReduxProvider store={reduxStore}>
        <MainStack />
      </ReduxProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
