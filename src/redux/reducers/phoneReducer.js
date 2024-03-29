import { state as initialState } from "./phoneState"
import {
    UIX_PHONE_SET_CONTACT_CREATE_INPUT,
    UIX_PHONE_SET_ADD_BACKGROUND_INPUT,
    UIX_PHONE_SET_DISPLAY_BACKGROUND,
    UIX_PHONE_SET_ANIMATION_DURATION,
    UIX_PHONE_SET_CUSTOM_BACKGROUND,
    UIX_PHONE_SET_MOBILE_DATA_MODE,
    UIX_PHONE_SET_DARK_BACKGROUND,
    UIX_PHONE_SET_UPDATE_CONTACTS,
    UIX_PHONE_SET_TWITTER_INPUTS,
    UIX_PHONE_SET_AIRPLANE_MODE,
    UIX_PHONE_SET_DISTURBE_MODE,
    UIX_PHONE_SET_NOTIFICATIONS,
    UIX_PHONE_SET_SHOW_NUMBER,
    UIX_PHONE_SET_BACKGROUND,
    UIX_PHONE_SET_ANIMATION,
    UIX_PHONE_SET_WIFI_MODE,
    UIX_PHONE_SET_DARK_MODE,
    UIX_PHONE_SET_MESSAGES,
    UIX_PHONE_SET_RINGTONE,
    UIX_PHONE_SET_CONTACT,
    UIX_PHONE_SET_CLASSES,
    UIX_PHONE_SET_IMAGES,
    UIX_PHONE_SET_THEME,
    UIX_PHONE_SET_IMAGE,
    UIX_PHONE_SET_PATH
} from "../actions/phoneTypes"

// Redux is sloppy sometimes so you have to copy the object and return a new one becuase it thinks we are mutating the original state lol
const copy = menu => JSON.parse(JSON.stringify(menu))

export default function(state = initialState, { payload, type }) {
    const newState = copy(state)

    switch (type) {
        case UIX_PHONE_SET_PATH:
            newState.general.path = payload
            return {
                ...state,
                general: newState.general
            }
        case UIX_PHONE_SET_ANIMATION:
            newState.general.appAnimation = payload
            return {
                ...state,
                general: newState.general
            }
        case UIX_PHONE_SET_ANIMATION_DURATION:
            newState.general.appAnimationDuration = payload
            return {
                ...state,
                general: newState.general
            }
        case UIX_PHONE_SET_DARK_BACKGROUND:
            newState.general.darkBackground = payload
            return {
                ...state,
                general: newState.general
            }
        case UIX_PHONE_SET_AIRPLANE_MODE:
            newState.settings.planeMode = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_WIFI_MODE:
            newState.settings.wifiEnabled = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_MOBILE_DATA_MODE:
            newState.settings.mobileDataEnabled = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_DARK_MODE:
            newState.settings.darkMode = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_DISTURBE_MODE:
            newState.settings.disturbeMode = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_BACKGROUND:
            newState.settings.background = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_THEME:
            newState.settings.theme = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_SHOW_NUMBER:
            newState.settings.showNumber = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_RINGTONE:
            newState.settings.ringtone = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_CUSTOM_BACKGROUND:
            newState.settings.customBackgrounds = payload
            return {
                ...state,
                settings: newState.settings
            }
        case UIX_PHONE_SET_CONTACT:
            newState.apps.contact = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_UPDATE_CONTACTS:
            newState.apps.contacts = payload
            return {
                ...state,
                apps: copy(newState.apps)
            }
        case UIX_PHONE_SET_CONTACT_CREATE_INPUT:
            newState.apps.contactCreate = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_MESSAGES:
            newState.apps.messages = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_NOTIFICATIONS:
            newState.apps.notifications = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_IMAGES:
            newState.apps.images = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_CLASSES:
            newState.general.classes = payload
            return {
                ...state,
                general: newState.general
            }
        case UIX_PHONE_SET_IMAGE:
            newState.apps.image = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_DISPLAY_BACKGROUND:
            newState.general.displayBackground = payload
            return {
                ...state,
                general: newState.general
            }
        case UIX_PHONE_SET_ADD_BACKGROUND_INPUT:
            newState.apps.settingAddBackgroundInputs = payload
            return {
                ...state,
                apps: newState.apps
            }
        case UIX_PHONE_SET_TWITTER_INPUTS:
            newState.apps.twitterInputs = payload
            return {
                ...state,
                apps: copy(newState.apps)
            }
        default:
            return state
    }
}
