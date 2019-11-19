import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./settings.css";
import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetTheme
} from "../../../../redux/actions/phoneActions";

export class SettingsBackground extends Component {

    render() {
        const { settings, t } = this.props
        const { darkMode, theme } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const themes = [
            { label: "Default", id: 1, type: t("apps.phone.apps.settings-themes.default-label") },
            { label: t("apps.phone.apps.settings-themes.gray-label"), type: "custom", id: 2, style: { backgroundImage: "linear-gradient(to left bottom, #181818, #181818, #181818, #3a3a3a, #464646)", color: "white" } }
        ]

        return (
            <div className="app" style={{ background: color_p }}>
                <div className="settings" style={{ background: color_p }}>

                    <div className="settings-top" style={{ background: color_s }}>
                        <div data-pos={[0, 0]} data-func="backspace" data-class="settings-quit-selected" className="settings-quit settings-theme-nav-element">
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="settings-label" style={{ color: color_t }}>{t("apps.phone.apps.settings-themes.label")}</div>
                    </div>

                    <div className="settings-middle">

                        <div className="settings-middle-themes">
                            {themes.map((_theme, i) => {
                                const selectedClass = (theme.id === _theme.id) ? "settings-theme-option-current-selected" : null
                                return (
                                    <div
                                        key={i}
                                        data-pos={[i + 1, 0]}
                                        data-class="settings-theme-option-selected"
                                        className={`settings-theme-option settings-theme-nav-element ${selectedClass}`}
                                        data-theme={JSON.stringify(_theme)}
                                        style={{ background: color_s, color: color_t }}>
                                        {_theme.label}
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>
        )
    }


    focus = (element) => {
        window.localStorage.setItem("settings-themes", JSON.stringify(element.pos))
    }
    exited = () => { }
    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    enter = ({ dataset }) => {
        if (dataset.func && this[dataset.func]) {
            this[dataset.func]()
            return
        }
        const { UIXPhoneSetTheme } = this.props
        const { theme } = dataset
        UIXPhoneSetTheme(JSON.parse(theme))
    }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "settings-themes") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("settings-theme-nav-element"))

        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("settings-themes")
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
    UIXPhoneSetTheme
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SettingsBackground))
