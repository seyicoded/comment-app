import { setPostASyncStorage } from "../../local/storage"
import ACTION_TYPE from "./type"

export const updateLoaderState = (bool: boolean, dispatch: any)=>{
    dispatch({
        type: ACTION_TYPE.APP_LOADER,
        payload: bool
    })
}

export const updateUserLoggedInState = (data: any, dispatch: any)=>{
    dispatch({
        type: ACTION_TYPE.ACTION_LOGINSETTER,
        payload: data
    })
}

export const updateLoaderCoverState = (bool: boolean, dispatch: any)=>{
    dispatch({
        type: ACTION_TYPE.APP_LOADER_COVER,
        payload: bool
    })
}

export const updateAddNewPostToState = async (data: any, oldAppPostCollections: any[], dispatch: any)=>{
    const newArr = [
        ...oldAppPostCollections,
        data
    ];

    // update async storage
    await setPostASyncStorage(newArr);

    // update redux
    dispatch({
        type: ACTION_TYPE.APP_POST_COLLECTION,
        payload: newArr
    })
}

export const updatePostToState = async (data: any[], dispatch: any)=>{
    const newArr = [
        ...data
    ];

    // update async storage
    await setPostASyncStorage(newArr);

    // update redux
    dispatch({
        type: ACTION_TYPE.APP_POST_COLLECTION,
        payload: newArr
    })
}