import { View, StyleSheet, StatusBar, Alert } from 'react-native'
import React from 'react'
import { Color } from '../../constants/color/color'
import { Divider, List, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { clearAll, clearAllByDestroy } from '../../store/local/storage'
import { NavigationProp } from '@react-navigation/native'
import ROUTE from '../../constants/route/route'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type Props = {
    navigation: NavigationProp<any>
}

const Setting = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={Color.PRIMARY} />
        <View  style={{ flex: 2 }}>
            <List.Item
                title="Profile"
                onPress={()=>{
                    Toast.show({
                        type: 'info',
                        text1: "Coming Soon"
                    })
                }}
                right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />
            <List.Item
                title="Logout"
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={()=>{
                    Alert.alert("Action Required", "are you sure you want to logout", [
                        {
                            text: "Abort",
                            style: 'default'
                        },
                        {
                            text: "Proceed",
                            style: "destructive",
                            onPress: async ()=>{
                                await clearAll();
                                await GoogleSignin.signOut();
                                navigation.navigate(ROUTE.SIGNIN);
                            }
                        }
                    ])
                }}
            />
            <Divider />
            <List.Item
                title="Clear EveryThing"
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={()=>{
                    Alert.alert("Action Required", "are you sure you want to clear everything, onboarding would be enabled", [
                        {
                            text: "Abort",
                            style: 'default'
                        },
                        {
                            text: "Proceed",
                            style: "destructive",
                            onPress: async ()=>{
                                await clearAllByDestroy();
                                await GoogleSignin.signOut();
                                navigation.navigate(ROUTE.ONBOARDING);
                            }
                        }
                    ])
                }}
            />
        </View>
        <Text style={{ textAlign: 'center', color: 'grey' }}>App Version: 1.0.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    }
})

export default Setting