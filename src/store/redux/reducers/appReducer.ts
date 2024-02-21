import ACTION_TYPE from "../action/type";

export const initState = {
    appLoading: false,
    appLoadingCover: false,
    authPopUp: false,
    isLoggedIn: false,
    userData: null,
    appNavigation: null,
    appPostCollections: [],
}

const AppReducer = (state = initState, action: any)=>{
    switch (action.type) {
        case ACTION_TYPE.APP_LOADER:
            return {...state, appLoading: action.payload}
            break;

        case ACTION_TYPE.APP_POST_COLLECTION:
            return {...state, appPostCollections: action.payload}
            break;

        case ACTION_TYPE.APP_LOADER_COVER:
            return {...state, appLoadingCover: action.payload}
            break;

        case ACTION_TYPE.APP_NAVIGATION:
            return {...state, appNavigation: action.payload}
            break;

        case ACTION_TYPE.ACTION_LOGINSETTER:
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload
            }
            break;

        case ACTION_TYPE.ACTION_LOGOUTSETTER:
            return {
                ...state,
                isLoggedIn: false,
                userData: null
            }
            break;

        default:
            return state;
            break;
    }
}

export default AppReducer;