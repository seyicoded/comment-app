import { NativeModules, Platform } from 'react-native'
import Aes from 'react-native-aes-crypto'

export const generateKey = (password: string, salt: string, cost: number, length: number) => Aes.pbkdf2(password, salt, cost, length, "sha256")

export const encryptData = (text: string, key: string) => {
    return Aes.randomKey(16).then(iv => {
        return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
            cipher,
            iv,
        }))
    })
}

export const decryptData = (encryptedData: any, key: string) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc')
