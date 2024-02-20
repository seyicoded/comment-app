import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "../../constants/storage/storage";
import { Alert } from "react-native";

export const getSignedInUserFromStorage = async ()=>{
    const user = await AsyncStorage.getItem(STORAGE.USER);

    if(user == null){
        return {status: false}
    }

    return {
        status: true,
        user: JSON.parse(user)
    }
}

export const setSignedInUserFromStorage = async(data: any)=>{
    await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(data))
}

export const clearAll = async ()=>{
    // await AsyncStorage.clear()
    await AsyncStorage.multiRemove([STORAGE.USER, STORAGE.SECURITY])
}

export const clearAllByDestroy = async ()=>{
    await AsyncStorage.clear()
}

export const setToken = async (data: any)=>{
    await AsyncStorage.setItem(STORAGE.SECURITY, JSON.stringify(data))
}

export const getToken = async (data?: any)=>{
    let token = await AsyncStorage.getItem(STORAGE.SECURITY);
    if(token != undefined){

        return JSON.parse(token);
    }

    return undefined;
}

export const setAppleDetail = async (data: any)=>{
    await AsyncStorage.setItem(STORAGE.APPLE, JSON.stringify(data))
}

export const getAppleDetail = async ()=>{
    const __ = (await AsyncStorage.getItem(STORAGE.APPLE));
    return __;
}


export const setSeenOnBoarind = async (data: any)=>{
    // Alert.alert(data);
    await AsyncStorage.setItem(STORAGE.REMEMBER_EMAIL, data);
    // Alert.alert(data);
}

export const getSeenOnBoarind = async ()=>{
    // await AsyncStorage.setItem(STORAGE.REMEMBER_EMAIL, "opadonuseyi01@gmail.com");
    const data: any = await AsyncStorage.getItem(STORAGE.REMEMBER_EMAIL);
    // Alert.alert(data);
    return (data);
}


