import React, { Component } from "react"
import { connect } from "react-redux"
import {
    UIXUpdate3DMarker,
    UIXChangeLocation,
    UIXSetInGameTime,
    UIXSetPlayer,
    UIXSetComfirmDialog,
    UIXSetDialog,
    UIXSetInventory,
    UIXSetCharacters,
    UIXUpdateMenus,
    UIXSetMenuIndex,
    UIXSetCharacter
} from "../../redux/actions/actions"
import { toast } from "react-toastify"
import { css } from "glamor"

export class EventListner extends Component {
    render() {
        return null
    }

    componentDidMount() {
        window.addEventListener("message", this.handleEvent)
        window.addEventListener("keyup", this.handleTest)
    }

    handleTest = ({ keyCode }) => {
        // this.UIX_SEND_NOTIFICATION({
        //     text: "Konstapel lars har gett dig en faktura på",
        //     duration: 5000
        // })
    }

    UIX_OPEN_MENU = menu => {
        const menus = this.props.menus
        const { UIXUpdateMenus, UIXSetMenuIndex } = this.props

        menu.elements.map(elem => {
            if (
                !elem.type ||
                (elem.type !== "default" &&
                    elem.type !== "slider" &&
                    elem.type !== "checkbox")
            )
                elem.type = "default"
            return elem
        })
        menu.focus = true
        menus.map(_menu => (_menu.focus = false))
        menus.push(menu)
        UIXUpdateMenus(menus)
        UIXSetMenuIndex(0)
    }

    UIX_SEND_NOTIFICATION = ({ text, duration }) => {
        toast(
            <span data-text={text} style={{ fontFamily: "Rubik" }}>
                {text}
            </span>,
            {
                pauseOnFocusLoss: false,
                autoClose: duration,
                closeButton: false,
                className: "uix-notification",
                progressClassName: css({
                    background: "rgba(62, 112, 139, 0.637) !important"
                })
            }
        )
    }

    UIX_REMOVE_3D_MARKER = id => {
        let markers = this.props.markers
        const { UIXUpdate3DMarker } = this.props
        const newMarkers = markers.markers.filter(c => c.id !== id)
        markers.markers = newMarkers
        UIXUpdate3DMarker(markers)
    }

    UIX_ADD_3D_MARKER = payload => {
        let markers = this.props.markers
        const { UIXUpdate3DMarker } = this.props
        markers.markers.push(payload)
        UIXUpdate3DMarker(markers)
    }

    UIX_UPDATE_3D_MARKER = payload => {
        let markers = this.props.markers
        const { UIXUpdate3DMarker } = this.props
        let found = false
        markers.markers.forEach((marker, i) => {
            if (marker.id === payload.id) {
                found = true
                markers.markers[i] = payload
            }
        })
        if (!found) markers.markers.push(payload)
        UIXUpdate3DMarker(markers)
    }

    handleEvent = event => {
        const exceptions = [
            "UIX_QUEUE_PROGRESSBAR",
            "UIX_REMOVE_PROGRESSBAR",
            "UIX_MENU_KEYDOWN",
            "INIT_INSTANCE",
            undefined
        ]

        if (!event.data) return
        const { payload, type } = event.data
        const {
            UIXChangeLocation,
            UIXSetInGameTime,
            UIXSetPlayer,
            UIXSetComfirmDialog,
            UIXSetDialog,
            UIXSetInventory,
            UIXSetCharacters,
            UIXSetCharacter
        } = this.props

        switch (type) {
            case "UIX_REMOVE_3D_MARKER":
                this.UIX_REMOVE_3D_MARKER(payload)
                break
            case "UIX_ADD_3D_MARKER":
                this.UIX_ADD_3D_MARKER(payload)
                break
            case "UIX_CHANGE_3D_MARKER":
                this.UIX_UPDATE_3D_MARKER(payload)
                break
            case "UIX_OPEN_MENU":
                this.UIX_OPEN_MENU(payload)
                break
            case "UIX_CHANGE_LOCATION":
                UIXChangeLocation(payload)
                break
            case "UIX_SEND_NOTIFICATION":
                this.UIX_SEND_NOTIFICATION(payload)
                break
            case "UIX_SET_INGAME_TIME":
                UIXSetInGameTime(payload)
                break
            case "UIX_SET_PLAYER":
                UIXSetPlayer(payload)
                break
            case "UIX_SET_INVENTORY":
                UIXSetInventory(payload)
                break
            case "UIX_SET_CHARACTERS":
                UIXSetCharacters(payload)
                break
            case "UIX_SET_COMFIRM_DIALOG":
                UIXSetComfirmDialog(payload)
                break
            case "UIX_SET_DIALOG":
                UIXSetDialog(payload)
                break
            case "UIX_SET_CHARACTER":
                UIXSetCharacter(payload)
                break
            default:
                if (exceptions.includes(type)) return
                console.log(
                    "The event emmited with the type " +
                        type +
                        " isn't recognized"
                )
        }
    }
}

const mapDispatchToProps = {
    UIXChangeLocation,
    UIXSetInGameTime,
    UIXSetPlayer,
    UIXSetComfirmDialog,
    UIXSetDialog,
    UIXSetInventory,
    UIXSetCharacters,
    UIXUpdateMenus,
    UIXSetMenuIndex,
    UIXSetCharacter,
    UIXUpdate3DMarker
}

const mapStateToProps = ({ top }) => ({
    menus: top.rendered.menu.menus,
    markers: top.rendered.threeDMarker
})

export default connect(mapStateToProps, mapDispatchToProps)(EventListner)
