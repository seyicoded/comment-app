import { decryptData, generateKey } from "../screens/functions/AES"
import { CONFIG } from "./settings";

export const MINI_DB = {
    DEFAULT_ACCOUNT: `opadonuseyi01@gmail.com:Password123$`
}

export const validateAccount = async (encrypted: any)=>{
    const key = await generateKey(CONFIG.APP_KEY_PASSWORD, CONFIG.APP_KEY_SALT, 256, 256);
    const d = await decryptData(encrypted, key)

    if(d === MINI_DB.DEFAULT_ACCOUNT){
        return true;
    }else{
        return false;
    }
}