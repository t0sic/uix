import { withTranslation } from "./node_modules/react-i18next";
import React, { Component } from "./node_modules/react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "./node_modules/react-redux";
import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath
} from "../../../../redux/actions/phoneActions";

export class Template extends Component {

    render() {
        const { settings } = this.props
        const { darkMode } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app" style={{ background: color_p }}>
                <div className="all-nav-elements-should-have-this-class" data-class="this-class-will-be-applied-when-its-selected" data-pos={[0, 0]}>Some element</div>
                <div className="all-nav-elements-should-have-this-class" data-class="this-class-will-be-applied-when-its-selected" data-pos={[0, 1]}>Another one</div>
            </div>
        )
    }


    focus = (element) => { window.localStorage.setItem("app-name", JSON.stringify(element.pos)) }
    exited = () => { }



    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings")
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    handleEvent = ({ detail }) => {
        if (detail.app !== "app-name") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("all-nav-elements-should-have-this-class"))

        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("app-name")
        if (item) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }
        navigation.handleSelected()

        UIXPhoneSetDarkBackground(settings.darkMode)
        setKeyNav(navigation)
    }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings
})

const mapDispatchToProps = {
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetPath,
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Template))
