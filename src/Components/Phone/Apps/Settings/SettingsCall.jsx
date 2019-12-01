import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./settings.css";
import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetShowNumber
} from "../../../../redux/actions/phoneActions";

export class SettingsCall extends Component {

    render() {
        const { settings, t } = this.props
        const { darkMode, showNumber } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app" style={{ background: color_p }}>
                <div className="settings" style={{ background: color_p }}>

                    <div className="settings-top" style={{ background: color_s }}>
                        <div data-pos={[0, 0]} data-func="backspace" data-class="settings-quit-selected" className="settings-quit settings-call-navigation-element">
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="settings-label" style={{ color: color_t }}>{t("apps.phone.apps.settings-call.label")}</div>
                    </div>

                    <div className="settings-middle">

                        <div className="settings-middle-call">
                            <div
                                data-pos={[1, 0]}
                                data-func="ringtones"
                                data-class="settings-call-option-selected"
                                className="settings-call-option settings-call-navigation-element"
                                style={{ background: color_s, color: color_t }}>
                                {t("apps.phone.apps.settings-call.change-ringtone")}
                            </div>
                            <div
                                data-pos={[2, 0]}
                                data-func="shownumber"
                                data-class="settings-call-option-selected"
                                className="settings-call-option settings-call-navigation-element"
                                style={{ background: color_s, color: color_t, height: "42px" }}>
                                <div className="settings-call-option-label">{t("apps.phone.apps.settings-call.show-number")}</div>
                                <div className="settings-call-option-switch">
                                    <label className="form-switch">
                                        <input readOnly checked={showNumber} type="checkbox" />
                                        <i className={darkMode ? "form-switch-i-dark" : "form-switch-i-light"} />
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }


    focus = (element) => {
        window.localStorage.setItem("settings-call", JSON.stringify(element.pos))
    }
    exited = () => { }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    shownumber = () => { this.props.UIXPhoneSetShowNumber(!this.props.settings.showNumber) }

    enter = ({ dataset }) => {
        if (!this[dataset.func]) return
        this[dataset.func]()
    }

    ringtones = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-ring-tone")
    }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "settings-call") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("settings-call-navigation-element"))

        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("settings-call")
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
    UIXPhoneSetShowNumber
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SettingsCall))
