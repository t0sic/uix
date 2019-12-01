import {
    UIX_INVENTORY_SET, UIX_UPDATE_MENUS, UIX_UPDATE_PROGRESS_BAR, UIX_CHANGE_LOCATION,
    UIX_SET_INGAME_TIME, UIX_SET_PLAYER, UIX_SET_COMFIRM_DIALOG, UIX_SET_DIALOG,
    UIX_SET_INVENTORY, UIX_SET_CHARACTERS, UIX_SET_MENU_INDEX, UIX_SET_CHARACTER,
    UIX_UPDATE_3D_MARKER, UIX_SET_WORLD
} from "./types";

export const UIXSetMenuIndex = index => dispatch => {
    dispatch({ type: UIX_SET_MENU_INDEX, payload: index })
}

export const UIXInventorySet = data => dispatch => {
    dispatch({ type: UIX_INVENTORY_SET, payload: data })
}

export const UIXUpdateMenus = data => dispatch => {
    dispatch({ type: UIX_UPDATE_MENUS, payload: data })
}

export const UIXUpdateProgressBar = data => dispatch => {
    dispatch({ type: UIX_UPDATE_PROGRESS_BAR, payload: data })
}

export const UIXChangeLocation = location => dispatch => {
    dispatch({ type: UIX_CHANGE_LOCATION, payload: location })
}

export const UIXSetInGameTime = time => dispatch => {
    dispatch({ type: UIX_SET_INGAME_TIME, payload: time })
}

export const UIXSetPlayer = player => dispatch => {
    dispatch({ type: UIX_SET_PLAYER, payload: player })
}

export const UIXSetComfirmDialog = data => dispatch => {
    dispatch({ type: UIX_SET_COMFIRM_DIALOG, payload: data })
}

export const UIXSetDialog = data => dispatch => {
    dispatch({ type: UIX_SET_DIALOG, payload: data })
}

export const UIXSetInventory = data => dispatch => {
    dispatch({ type: UIX_SET_INVENTORY, payload: data })
}

export const UIXSetCharacters = characters => dispatch => {
    dispatch({ type: UIX_SET_CHARACTERS, payload: characters })
}

export const UIXSetCharacter = data => dispatch => {
    if (!data.value) return
    dispatch({ type: UIX_SET_CHARACTER, payload: data })
}

export const UIXUpdate3DMarker = data => dispatch => {
    dispatch({ type: UIX_UPDATE_3D_MARKER, payload: data })
}

export const UIXSetWorld = data => dispatch => {
    dispatch({ type: UIX_SET_WORLD, payload: data })
}