import { UIXPhoneSetPath, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetDarkBackground } from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./home.css";

export class Home extends Component {
    render() {

        const { settings, t } = this.props
        const { background, theme } = settings
        const { dark } = background
        const apps = [
            {
                label: t("apps.phone.apps.home.settings-label"),
                app: "settings",
                icon: <i className="fas fa-cogs" />,
                styles: {
                    background: "rgb(66, 65, 65)"
                }
            },
            {
                label: t("apps.phone.apps.home.contacts-label"),
                app: "contacts",
                icon: <i className="fas fa-phone" />,
                styles: {
                    background: "#4D9A3D"
                }
            },
            {
                label: t("apps.phone.apps.home.messages-label"),
                app: "messages",
                icon: <i className="fas fa-comment" />,
                styles: {
                    background: "#4D9A3D"
                }
            },
            {
                label: t("apps.phone.apps.home.camera-label"),
                app: "camera",
                icon: <i className="fas fa-camera" />,
                styles: {
                    background: "#797979"
                }
            },
            {
                label: t("apps.phone.apps.home.twitter-label"),
                app: "twitter",
                icon: <i className="fab fa-twitter" />,
                styles: {
                    background: "#38A1F3"
                }
            },
            {
                label: t("apps.phone.apps.home.bank-label"),
                app: "bank",
                icon: <i className="fas fa-university" />,
                styles: {
                    background: "rgb(206, 51, 100)"
                }
            },
        ]

        return (
            <div className="app">
                <div className="home-container">
                    {apps.map(({ app, label, styles, icon, data }, i) => {
                        const style = (theme.type === "default") ? styles : theme.style
                        const labelStyle = { color: dark ? "white" : "black" }
                        const row = Math.floor(i / 4)
                        const column = i % 4

                        return (
                            <div className="home-app" data-app={JSON.stringify({ app, data })} data-class="home-app-selected" data-pos={[row, column]} key={i}>
                                <div className="home-app-icon" style={style}>{icon}</div>
                                <div className="home-app-label" style={labelStyle}>{label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    openApp = (data) => {
        const { UIXPhoneSetPath, UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation } = this.props
        const { app } = data

        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath(app)
    }


    entered = () => {
        const elements = Array.from(document.getElementsByClassName("home-container")[0].childNodes)
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const { background } = settings

        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("home")
        if (item) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }
        navigation.handleSelected()

        setTimeout(() => { UIXPhoneSetDarkBackground(background.dark) }, 1)
        setKeyNav(navigation)
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "home") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    enter = ({ dataset }) => { this.openApp(JSON.parse(dataset.app)) }
    focus = (element) => {
        window.localStorage.setItem("home", JSON.stringify(element.pos))
    }
    backspace = (data) => { }
    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings
})

const mapDispatchToProps = {
    UIXPhoneSetPath,
    UIXPhoneSetAnitmation,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Home))
