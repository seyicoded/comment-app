import { notifications } from "../../../constants/mock/notification.mock";
import ACTION_TYPE from "../action/type";

export const initState = {
    appLoading: false,
    appLoadingCover: false,
    authPopUp: false,
    isLoggedIn: false,
    userData: null,
    userWallet: null,
    myAddresses: [],
    myDefaultAddressId: 0,
    appNavigation: null,
    myCards: [],
    myDefaultCardId: "",
    fromDeepLink: false,
    path: "",
    bids: [],
    auction: [],
    category: [],
    userToken: "",
    fcmToken: "",
    currentBid: {},
    activeBid: [],
    wonBid: [],
    pastBid: [],
    myNotification: [],
    myNotificationPreference: {
        push_notification: "on",
        email_notification: [
            "bid",
            "auction",
            "payment",
            "refund",
            "other"
        ]
    },
    // myNotification: notifications,
}

const AppReducer = (state = initState, action: any)=>{
    switch (action.type) {
        case ACTION_TYPE.APP_LOADER:
            return {...state, appLoading: action.payload}
            break;

        case ACTION_TYPE.APP_LOADER_COVER:
            return {...state, appLoadingCover: action.payload}
            break;

        case ACTION_TYPE.APP_NAVIGATION:
            return {...state, appNavigation: action.payload}
            break;

        case ACTION_TYPE.FCM_TOKEN:
            return {...state, fcmToken: action.payload}
            break;

        case ACTION_TYPE.ACTIVE_BID:
            return {...state, activeBid: action.payload}
            break;

        case ACTION_TYPE.PAST_BID:
            return {...state, pastBid: action.payload}
            break;

        case ACTION_TYPE.WON_BID:
            return {...state, wonBid: action.payload}
            break;

        case ACTION_TYPE.BIDS:
            return {...state, bids: action.payload}
            break;

        case ACTION_TYPE.NOTIFICATION:
            return {...state, myNotification: action.payload}
            break;

        case ACTION_TYPE.AUCTION:
            return {...state, auction: action.payload}
            break;

        case ACTION_TYPE.CURRENT_BID:
            return {...state, currentBid: action.payload}
            break;

        case ACTION_TYPE.CATEGORY:
            return {...state, category: action.payload}
            break;

        case ACTION_TYPE.MY_ADDRESSES:
            // console.log(action.payload.default);
            return {
                ...state, 
                myAddresses: action.payload?.data,
                myDefaultAddressId: action.payload?.id}
            break;

        case ACTION_TYPE.NOTIFICATION_PREFERENCE:
            return {
                ...state, 
                myNotificationPreference: {
                    push_notification: action.payload?.push_notification,
                    email_notification: action.payload?.email_notification
                }
            }
            break;

        case ACTION_TYPE.DEEP_LINK:
            return {
                ...state, 
                fromDeepLink: action.payload.active,
                path: action.payload.path,
            }
            break;

        case ACTION_TYPE.MY_CARDS:

            // console.log(action.payload.default);
            return {
                ...state, 
                myCards: action.payload.data,
                myDefaultCardId: action.payload.default
            }
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