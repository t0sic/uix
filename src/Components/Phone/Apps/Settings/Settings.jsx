import { withTranslation } from "react-i18next"
import React, { Component } from "react"
import { connect } from "react-redux"
import KeyNav from "../../Main/KeyNav"
import "./settings.css"
import {
    UIXPhoneSetDarkBackground,
    UIXPhoneSetPlaneMode,
    UIXPhoneSetWiFiMode,
    UIXPhoneSetMobileDataMode,
    UIXPhoneSetDarkMode,
    UIXPhoneSetDisturbeMode,
    UIXPhoneSetPath,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetAnitmation
} from "../../../../redux/actions/phoneActions"

export class Settings extends Component {
    UIXPhoneSetPlaneMode = () =>
        this.props.UIXPhoneSetPlaneMode(!this.props.settings.planeMode)
    UIXPhoneSetWiFiMode = () =>
        this.props.UIXPhoneSetWiFiMode(!this.props.settings.wifiEnabled)
    UIXPhoneSetMobileDataMode = () =>
        this.props.UIXPhoneSetMobileDataMode(
            !this.props.settings.mobileDataEnabled
        )
    UIXPhoneSetDarkMode = () =>
        this.props.UIXPhoneSetDarkMode(!this.props.settings.darkMode)
    UIXPhoneSetDisturbeMode = () =>
        this.props.UIXPhoneSetDisturbeMode(!this.props.settings.disturbeMode)

    render() {
        const { settings, UIXPhoneSetDarkBackground, t } = this.props
        const {
            darkMode,
            planeMode,
            wifiEnabled,
            mobileDataEnabled,
            disturbeMode
        } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const config = {
            s1: [
                {
                    label: t("apps.phone.apps.settings.airplane-mode-label"),
                    iconStyle: { background: "rgb(255, 159, 10)" },
                    icon: <i className="fas fa-plane" />,
                    func: "UIXPhoneSetPlaneMode",
                    action: (
                        <label className="form-switch">
                            <input
                                readOnly
                                checked={planeMode}
                                type="checkbox"
                            />
                            <i
                                className={
                                    darkMode
                                        ? "form-switch-i-dark"
                                        : "form-switch-i-light"
                                }
                            />
                        </label>
                    )
                },
                {
                    label: t("apps.phone.apps.settings.wifi-label"),
                    iconStyle: { background: "rgb(0, 122, 255)" },
                    icon: <i className="fas fa-wifi" />,
                    func: "UIXPhoneSetWiFiMode",
                    action: (
                        <label className="form-switch">
                            <input
                                readOnly
                                checked={wifiEnabled}
                                type="checkbox"
                            />
                            <i
                                className={
                                    darkMode
                                        ? "form-switch-i-dark"
                                        : "form-switch-i-light"
                                }
                            />
                        </label>
                    )
                },
                {
                    label: t("apps.phone.apps.settings.mobile-data-label"),
                    iconStyle: { background: "rgb(48, 209, 88)" },
                    icon: <i className="fas fa-server" />,
                    func: "UIXPhoneSetMobileDataMode",
                    action: (
                        <label className="form-switch">
                            <input
                                readOnly
                                checked={mobileDataEnabled}
                                type="checkbox"
                            />
                            <i
                                className={
                                    darkMode
                                        ? "form-switch-i-dark"
                                        : "form-switch-i-light"
                                }
                            />
                        </label>
                    )
                },
                {
                    label: t("apps.phone.apps.settings.dark-mode-label"),
                    iconStyle: { background: "rgb(175, 82, 222)" },
                    icon: <i className="fas fa-adjust" />,
                    func: "UIXPhoneSetDarkMode",
                    action: (
                        <label className="form-switch">
                            <input
                                readOnly
                                checked={darkMode}
                                type="checkbox"
                            />
                            <i
                                className={
                                    darkMode
                                        ? "form-switch-i-dark"
                                        : "form-switch-i-light"
                                }
                            />
                        </label>
                    )
                },
                {
                    label: t("apps.phone.apps.settings.disturb-mode-label"),
                    iconStyle: { background: "rgb(94, 92, 230)" },
                    icon: <i className="fas fa-moon" />,
                    func: "UIXPhoneSetDisturbeMode",
                    action: (
                        <label className="form-switch">
                            <input
                                readOnly
                                checked={disturbeMode}
                                type="checkbox"
                            />
                            <i
                                className={
                                    darkMode
                                        ? "form-switch-i-dark"
                                        : "form-switch-i-light"
                                }
                            />
                        </label>
                    )
                }
            ],
            s2: [
                {
                    label: t("apps.phone.apps.settings.phone-label"),
                    iconStyle: { background: "rgb(52, 199, 89)" },
                    icon: <i className="fas fa-phone" />,
                    func: "call",
                    action: (
                        <div className="settings-option-arrow">
                            <i
                                className="fas fa-chevron-right"
                                style={{ color: color_t }}
                            />
                        </div>
                    )
                },
                {
                    label: t("apps.phone.apps.settings.themes-label"),
                    iconStyle: { background: "rgb(90, 200, 250)" },
                    icon: <i className="fas fa-bookmark" />,
                    func: "themes",
                    action: (
                        <div className="settings-option-arrow">
                            <i
                                className="fas fa-chevron-right"
                                style={{ color: color_t }}
                            />
                        </div>
                    )
                },
                {
                    label: t("apps.phone.apps.settings.backgrounds-label"),
                    iconStyle: { background: "rgb(255, 59, 48)" },
                    icon: <i className="fas fa-images" />,
                    func: "backgrounds",
                    action: (
                        <div className="settings-option-arrow">
                            <i
                                className="fas fa-chevron-right"
                                style={{ color: color_t }}
                            />
                        </div>
                    )
                }
            ]
        }

        UIXPhoneSetDarkBackground(darkMode)

        return (
            <div className="app">
                <div className="settings" style={{ background: color_p }}>
                    <div
                        className="settings-top"
                        style={{ background: color_s }}
                    >
                        <div
                            className="settings-label"
                            style={{ color: color_t }}
                        >
                            {t("apps.phone.apps.settings.label")}
                        </div>
                    </div>

                    <div className="settings-middle">
                        <div className="settings-middle-s1">
                            {config.s1.map(
                                (
                                    { label, icon, iconStyle, action, func },
                                    i
                                ) => (
                                    <div
                                        key={i}
                                        className="settings-option"
                                        data-function={func}
                                        data-class="settings-option-selected"
                                        data-pos={[i, 0]}
                                        style={{ background: color_s }}
                                    >
                                        <div className="settings-option-icon">
                                            <div style={iconStyle}>{icon}</div>
                                        </div>
                                        <div
                                            className="settings-option-label"
                                            style={{ color: color_t }}
                                        >
                                            {label}
                                        </div>
                                        <div className="settings-option-action">
                                            {action}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="settings-middle-s2">
                            {config.s2.map(
                                (
                                    { label, icon, iconStyle, action, func },
                                    i
                                ) => (
                                    <div
                                        key={i}
                                        className="settings-option"
                                        data-function={func}
                                        data-class="settings-option-selected"
                                        data-pos={[i + 5, 0]}
                                        style={{ background: color_s }}
                                    >
                                        <div className="settings-option-icon">
                                            <div style={iconStyle}>{icon}</div>
                                        </div>
                                        <div
                                            className="settings-option-label"
                                            style={{ color: color_t }}
                                        >
                                            {label}
                                        </div>
                                        <div className="settings-option-action">
                                            {action}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    focus = element => {
        window.localStorage.setItem("settings", JSON.stringify(element.pos))
    }

    enter = ({ dataset }) => {
        this[dataset.function]()
    }
    exited = () => {
        this.props.UIXPhoneSetDarkBackground(true)
    }
    componentDidMount() {
        window.addEventListener("phone", this.handleEvent)
    }

    themes = () => {
        const {
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-themes")
    }

    call = () => {
        const {
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-call")
    }

    backgrounds = () => {
        const {
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-background")
    }

    backspace = () => {
        const {
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath("home")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "settings") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav } = this.props
        const elements = [
            ...Array.from(
                document.getElementsByClassName("settings-middle-s1")[0]
                    .childNodes
            ),
            ...Array.from(
                document.getElementsByClassName("settings-middle-s2")[0]
                    .childNodes
            )
        ]

        const navigation = new KeyNav(elements, (event, data) =>
            this[event](data)
        )
        const item = window.localStorage.getItem("settings")
        if (item) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }

        navigation.handleSelected()

        setKeyNav(navigation)
    }
}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings
})

const mapDispatchToProps = {
    UIXPhoneSetDarkBackground,
    UIXPhoneSetPlaneMode,
    UIXPhoneSetWiFiMode,
    UIXPhoneSetMobileDataMode,
    UIXPhoneSetDarkMode,
    UIXPhoneSetDisturbeMode,
    UIXPhoneSetPath,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetAnitmation
}

export default withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(Settings)
)
