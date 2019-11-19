import React, { Component } from "react";
import { connect } from "react-redux";
import { UIXUpdateMenus, UIXSetMenuIndex } from "../../redux/actions/actions";
import "./menus.css";

export class Menus extends Component {

    render() {

        const menus = this.menus()

        return (
            <div className="menus">
                {menus}
            </div>
        )
    }

    menus = () => {
        let output = []
        const menus = this.props.menu.menus

        menus.forEach(({ label, elements, focus, name }, i) => {

            let width = 0
            let elementsWidth = []

            elements.forEach(({ text }) => {
                elementsWidth.push(text.length)
            })

            width = Math.max(...elementsWidth) * 16

            const hidden = focus ? "block" : "none"

            output.push(
                <div className="menu" id={`menu-${name}`} style={{ width: width + "px", display: hidden }} key={i}>

                    <div className="menu-head">
                        <div>{label}</div>
                    </div>

                    <div className="menu-elements">
                        {elements.map(({ text, type, state }, i) => {
                            let classes = (this.props.index === i) ? "menu-element-selected " : null
                            let glitch = (this.props.index === i) ? "glitch gl-4" : null
                            classes += (state === "disabled") ? " menu-element-disabled" : null

                            if (type === "default") {
                                return (
                                    <div key={i} className={`menu-element ${classes}`}>
                                        <div className={`menu-element-text ${glitch}`}><span data-text={text}>{text}</span></div>
                                    </div>
                                )
                            } else if (type === "checkbox") {
                                return (
                                    <div key={i} className={`menu-element ${classes}`}>
                                        <div className={`menu-element-text ${glitch}`}><span data-text={text}>{text}</span></div>
                                        <div className="menu-element-checkbox">
                                            <div className="menu-element-checkbox-box">
                                                {state ? <i className="fas fa-check"></i> : null}
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else if (type === "slider") {
                                return (
                                    <div key={i} className={`menu-element ${classes}`}>
                                        <div className={`menu-element-text ${glitch}`}><span data-text={text}>{text}</span> &lt;<span>{state.value}</span>></div>
                                    </div>
                                )
                            } else { return null }
                        })}
                    </div>

                </div>)
        })

        return output
    }

    activeMenu = () => {

        const menus = this.props.menu.menus
        let menu = null

        menus.forEach(({ focus }, i) => {
            if (focus) menu = menus[i]
        })

        return menu
    }

    handleMove = (direction, data) => {
        const activeMenu = this.activeMenu()
        if (!activeMenu) return
        const { UIXSetMenuIndex, UIXUpdateMenus } = this.props
        let menus = this.props.menu.menus
        let index = this.props.index

        switch (direction) {
            case "UP":
                if (this.props.index - 1 !== -1) {
                    index = this.props.index - 1
                } else {
                    index = activeMenu.elements.length - 1
                }
                break;
            case "DOWN":
                if (this.props.index !== activeMenu.elements.length - 1) {
                    index = this.props.index + 1
                } else {
                    index = 0
                }
                break;
            case "RIGHT":
                if (activeMenu.elements[index].type === "slider") {
                    if (data && data.shift) {
                        if (!(menus[menus.indexOf(activeMenu)].elements[index].state.value + 10 > menus[menus.indexOf(activeMenu)].elements[index].state.max)) {
                            menus[menus.indexOf(activeMenu)].elements[index].state.value += 10
                        } else {
                            menus[menus.indexOf(activeMenu)].elements[index].state.value = menus[menus.indexOf(activeMenu)].elements[index].state.max
                        }
                    } else {
                        if (menus[menus.indexOf(activeMenu)].elements[index].state.value !== menus[menus.indexOf(activeMenu)].elements[index].state.max) {
                            menus[menus.indexOf(activeMenu)].elements[index].state.value++
                        }
                    }
                    window.emit("UIX_MENU_SLIDER_CHANGE", { current: this.activeMenu().elements[index], menu: this.activeMenu() })
                    UIXUpdateMenus(menus)
                }
                break;
            case "LEFT":
                if (activeMenu.elements[index].type === "slider") {
                    if (data && data.shift) {
                        if (!(menus[menus.indexOf(activeMenu)].elements[index].state.value - 10 < menus[menus.indexOf(activeMenu)].elements[index].state.min)) {
                            menus[menus.indexOf(activeMenu)].elements[index].state.value -= 10
                        } else {
                            menus[menus.indexOf(activeMenu)].elements[index].state.value = menus[menus.indexOf(activeMenu)].elements[index].state.min
                        }
                    } else {
                        if (menus[menus.indexOf(activeMenu)].elements[index].state.value !== menus[menus.indexOf(activeMenu)].elements[index].state.min) {
                            menus[menus.indexOf(activeMenu)].elements[index].state.value--
                        }
                    }
                    window.emit("UIX_MENU_SLIDER_CHANGE", { current: this.activeMenu().elements[index], menu: this.activeMenu() })
                    UIXUpdateMenus(menus)
                }
                break;
            case "ENTER":
                if (activeMenu.elements[index].type === "checkbox") {
                    menus[menus.indexOf(activeMenu)].elements[index].state = !menus[menus.indexOf(activeMenu)].elements[index].state
                    UIXUpdateMenus(menus)
                }
                console.log("runs?")
                window.emit("UIX_MENU_ENTER", { current: this.activeMenu().elements[index], menu: this.activeMenu() })
                break;
            case "BACKSPACE":
                this.closeMenu()
                break;
            default: console.log(direction + " runs?")
        }

        if (direction === "ENTER" || direction === "LEFT" || direction === "RIGHT" || direction === "BACKSPACE") return
        window.emit("UIX_MENU_FOCUS", { current: this.activeMenu().elements[index], menu: this.activeMenu() })
        document.getElementById(`menu-${this.activeMenu().name}`).children[1].children[index].scrollIntoViewIfNeeded()
        UIXSetMenuIndex(index)
    }

    closeMenu = () => {
        const menus = this.props.menu.menus
        const index = 0
        const { UIXUpdateMenus, UIXSetMenuIndex } = this.props

        if (menus[menus.indexOf(this.activeMenu()) - 1]) {
            menus[menus.indexOf(this.activeMenu()) - 1].focus = true
        }
        menus.splice(menus.indexOf(this.activeMenu()), 1)
        UIXUpdateMenus(menus)
        UIXSetMenuIndex(index)
    }

    handleEvent = (event) => {
        if (!event.data) return
        const { payload, type } = event.data
        switch (type) {
            case "UIX_MENU_KEYDOWN":
                this.handleMove(payload.direction, payload.data)
                break;
            default:
        }
    }

    componentDidMount() {
        window.addEventListener("message", this.handleEvent)
        window.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 40: // Down
                    this.handleMove("DOWN")
                    break;
                case 38: // Up
                    this.handleMove("UP")
                    break;
                case 13: // Enter
                    this.handleMove("ENTER")
                    break;
                case 37: // Left
                    this.handleMove("LEFT")
                    break;
                case 39: // Right
                    this.handleMove("RIGHT")
                    break;
                case 8:
                    this.handleMove("BACKSPACE")
                    break;
                default:
                    // console.log(e.keyCode)
                    break;
            }
        })
    }

}

const mapStateToProps = ({ top }) => ({
    menu: top.rendered.menu,
    index: top.rendered.menu.index
})

const mapDispatchToProps = {
    UIXUpdateMenus,
    UIXSetMenuIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus)
