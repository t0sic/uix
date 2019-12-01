import { state as initialState } from "./state";
import { 
    UIX_UPDATE_3D_MARKER, UIX_INVENTORY_SET, UIX_UPDATE_MENUS, UIX_UPDATE_PROGRESS_BAR, UIX_CHANGE_LOCATION, 
    UIX_SET_INGAME_TIME, UIX_SET_PLAYER, UIX_UPDATE_BANK, UIX_SET_COMFIRM_DIALOG, UIX_SET_DIALOG, UIX_SET_INVENTORY, 
    UIX_SET_CHARACTERS, UIX_SET_MENU_INDEX, UIX_SET_CHARACTER, UIX_SET_WORLD
} from "../actions/types";

// Redux is sloppy sometimes so you have to copy the object and return a new one becuase it thinks we are mutating the original state lol
const copy = (menu) => JSON.parse(JSON.stringify(menu))

export default function (state = initialState, { payload, type }) {

    const newState = copy(state)

    switch (type) {
        case UIX_UPDATE_3D_MARKER:
            newState.rendered.threeDMarker = payload
            return {
                ...state,
                rendered: copy(newState.rendered)
            }
        case UIX_SET_MENU_INDEX:
            newState.rendered.menu.index = payload
            return {
                ...state,
                rendered: newState.rendered
            }
        case UIX_INVENTORY_SET:
            newState.player.character.inventory = payload
            return {
                ...state,
                player: newState.player
            }
        case UIX_UPDATE_MENUS:
            newState.rendered.menu.menus = payload
            return {
                ...state,
                rendered: copy(newState.rendered)
            }
        case UIX_UPDATE_PROGRESS_BAR:
            newState.rendered.progressBar = payload
            return {
                ...state,
                rendered: newState.rendered
            }
        case UIX_CHANGE_LOCATION:
            newState.application.path = payload
            return {
                ...state,
                application: newState.application
            }
        case UIX_SET_INGAME_TIME:
            newState.world.time = payload
            return {
                ...state,
                world: newState.world
            }
        case UIX_SET_PLAYER:
            return {
                ...state,
                player: payload
            }
        case UIX_UPDATE_BANK:
            newState.rendered.bank = payload
            return {
                ...state,
                rendered: newState.rendered
            }
        case UIX_SET_COMFIRM_DIALOG:
            newState.rendered.comfirm = payload
            return {
                ...state,
                rendered: newState.rendered
            }
        case UIX_SET_DIALOG:
            newState.rendered.dialog = payload
            return {
                ...state,
                rendered: newState.rendered
            }
        case UIX_SET_INVENTORY:
            newState.player.character.inventory = payload
            return {
                ...state,
                player: newState.player
            }
        case UIX_SET_CHARACTERS:
            newState.player.characters = payload
            return {
                ...state,
                player: newState.player
            }
        case UIX_SET_CHARACTER:
            newState.player.character[payload.value] = payload.data
            return {
                ...state,
                player: newState.player
            }
        case UIX_SET_WORLD: 
            newState.world = payload
            return {
                ...state,
                world: newState.world
            }
            
        default:
            return state
    }

}