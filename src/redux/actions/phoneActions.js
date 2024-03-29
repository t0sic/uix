import {
    UIX_PHONE_SET_PATH,
    UIX_PHONE_SET_ANIMATION,
    UIX_PHONE_SET_ANIMATION_DURATION,
    UIX_PHONE_SET_DARK_BACKGROUND,
    UIX_PHONE_SET_AIRPLANE_MODE,
    UIX_PHONE_SET_WIFI_MODE,
    UIX_PHONE_SET_MOBILE_DATA_MODE,
    UIX_PHONE_SET_DARK_MODE,
    UIX_PHONE_SET_DISTURBE_MODE,
    UIX_PHONE_SET_BACKGROUND,
    UIX_PHONE_SET_THEME,
    UIX_PHONE_SET_SHOW_NUMBER,
    UIX_PHONE_SET_RINGTONE,
    UIX_PHONE_SET_CUSTOM_BACKGROUND,
    UIX_PHONE_SET_CONTACT,
    UIX_PHONE_SET_UPDATE_CONTACTS,
    UIX_PHONE_SET_CONTACT_CREATE_INPUT,
    UIX_PHONE_SET_MESSAGES,
    UIX_PHONE_SET_NOTIFICATIONS,
    UIX_PHONE_SET_IMAGES,
    UIX_PHONE_SET_CLASSES,
    UIX_PHONE_SET_IMAGE,
    UIX_PHONE_SET_DISPLAY_BACKGROUND,
    UIX_PHONE_SET_ADD_BACKGROUND_INPUT,
    UIX_PHONE_SET_TWITTER_INPUTS
} from "./phoneTypes"

export const UIXPhoneSetPath = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_PATH, payload: data })
}

export const UIXPhoneSetAnitmation = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_ANIMATION, payload: data })
}

export const UIXPhoneSetAnimationDuration = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_ANIMATION_DURATION, payload: data })
}

export const UIXPhoneSetDarkBackground = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_DARK_BACKGROUND, payload: data })
}

export const UIXPhoneSetPlaneMode = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_AIRPLANE_MODE, payload: data })
}

export const UIXPhoneSetWiFiMode = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_WIFI_MODE, payload: data })
}

export const UIXPhoneSetMobileDataMode = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_MOBILE_DATA_MODE, payload: data })
}

export const UIXPhoneSetDarkMode = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_DARK_MODE, payload: data })
}

export const UIXPhoneSetDisturbeMode = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_DISTURBE_MODE, payload: data })
}

export const UIXPhoneSetBackground = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_BACKGROUND, payload: data })
}

export const UIXPhoneSetTheme = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_THEME, payload: data })
}

export const UIXPhoneSetShowNumber = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_SHOW_NUMBER, payload: data })
}

export const UIXPhoneSetRingTone = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_RINGTONE, payload: data })
}

export const UIXPhoneSetCustomBackground = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_CUSTOM_BACKGROUND, payload: data })
}

export const UIXPhoneSetContact = contact => dispatch => {
    dispatch({ type: UIX_PHONE_SET_CONTACT, payload: contact })
}

export const UIXPhoneUpdateContacts = payload => dispatch => {
    dispatch({ type: UIX_PHONE_SET_UPDATE_CONTACTS, payload })
}

export const UIXSetContactCreateInput = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_CONTACT_CREATE_INPUT, payload: data })
}

export const UIXSetMessages = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_MESSAGES, payload: data })
}

export const UIXSetNotifications = data => dispatch => {
    data = data.filter(c => c.notifications.length !== 0)
    dispatch({ type: UIX_PHONE_SET_NOTIFICATIONS, payload: data })
}

export const UIXSetImages = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_IMAGES, payload: data })
}

export const UIXSetPhoneClasses = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_CLASSES, payload: data })
}

export const UIXSetImage = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_IMAGE, payload: data })
}

export const UIXSetDisplayBackground = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_DISPLAY_BACKGROUND, payload: data })
}

export const UIXSetAddBackgroundInput = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_ADD_BACKGROUND_INPUT, payload: data })
}

export const UIXSetTwitterInputs = data => dispatch => {
    dispatch({ type: UIX_PHONE_SET_TWITTER_INPUTS, payload: data })
}
