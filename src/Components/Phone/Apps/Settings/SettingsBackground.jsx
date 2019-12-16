import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./settings.css";
import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetBackground
} from "../../../../redux/actions/phoneActions";

export class SettingsBackground extends Component {

    render() {
        const { settings, t } = this.props
        const { darkMode, background, customBackgrounds } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const backgrounds = [
            { id: 1, url: "https://cdn.discordapp.com/attachments/638346400102481932/645020723227787281/glitched_1920x1080.png", dark: true, label: t("apps.phone.apps.settings-background.glitched") },
            { id: 2, url: "https://images.unsplash.com/photo-1551509134-eb7c5ea9ad2d?ixlib=rb-1.2.1&w=1000&q=80", dark: true, label: t("apps.phone.apps.settings-background.dark-sky") },
            { id: 3, url: "https://preview.redd.it/sds71dbzjqn31.jpg?auto=webp&s=435ff1302f1f5fc9d3887d6c6795daaa571e3837", dark: true, label: t("apps.phone.apps.settings-background.dark-lake") },
            { id: 4, url: "https://wallpapercave.com/wp/wp1923667.jpg", dark: true, label: t("apps.phone.apps.settings-background.glitchy-neon") },
            { id: 5, url: "https://i.pinimg.com/originals/e1/5b/46/e15b46544fdf6fccef1f6a04bc8fa3ca.png", dark: true, label: t("apps.phone.apps.settings-background.watchtower") },
            { id: 6, url: "https://www.desktopbackground.org/p/2010/11/14/111026_winter-nature-iphone-wallpapers-hd-6s-and-6-backgrounds_750x1334_h.jpg", dark: true, label: t("apps.phone.apps.settings-background.winter") },
            { id: 7, url: "https://novemberfive.co/images/2018/04/26/010-010-header-1.png", dark: true, label: t("apps.phone.apps.settings-background.react") },
            { id: 8, url: "https://images.wallpaperscraft.com/image/rose_bud_flower_dark_background_118241_938x1668.jpg", dark: true, label: t("apps.phone.apps.settings-background.rose") }
        ]

        return (
            <div className="app" style={{ background: color_p }}>
                <div className="settings" style={{ background: color_p }}>

                    <div className="settings-top" style={{ background: color_s }}>
                        <div data-pos={[0, 0]} data-func="backspace" data-class="settings-quit-selected" className="settings-quit settings-background-nav-element">
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="settings-label" style={{ color: color_t }}>{t("apps.phone.apps.settings-background.label")}</div>
                    </div>

                    <div className="settings-middle">

                        <div className="settings-middle-backgrounds" style={{ background: color_p }}>
                            <div
                                data-pos={[1, 0]}
                                data-class="settings-background-option-selected"
                                data-func="addOwn"
                                className="settings-background-option settings-background-nav-element"
                                style={{ background: color_s, color: color_t }}>
                                + Add background
                            </div>
                            {[...backgrounds, ...customBackgrounds].map((_background, i) => {
                                const selectedClass = (background.id === _background.id) ? "settings-background-option-current-selected" : null
                                return (
                                    <div
                                        key={i}
                                        data-pos={[i + 2, 0]}
                                        data-class="settings-background-option-selected"
                                        className={`settings-background-option settings-background-nav-element ${selectedClass}`}
                                        data-background={JSON.stringify(_background)}
                                        style={{ background: color_s, color: color_t }}>
                                        {_background.label}
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
        window.localStorage.setItem("settings-background", JSON.stringify(element.pos))
        element.scrollIntoViewIfNeeded()
    }
    exited = () => { }
    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    enter = ({ dataset }) => {
        const { UIXPhoneSetBackground } = this.props
        const { background, func } = dataset
        if (func) {
            this[func]()
        } else UIXPhoneSetBackground(JSON.parse(background))
    }

    addOwn = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-background-add")
    }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "settings-background") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("settings-background-nav-element"))

        const navigation = new KeyNav(elements, (event, data) => this[event](data))

        const item = window.localStorage.getItem("settings-background")
        if (item && navigation.isPosition(JSON.parse(item))) {
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
    UIXPhoneSetBackground
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SettingsBackground))
