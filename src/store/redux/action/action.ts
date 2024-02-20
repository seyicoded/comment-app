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
