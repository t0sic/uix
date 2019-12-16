import { UIXPhoneSetPath, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetDarkBackground, UIXSetImages, UIXSetImage } from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./home.css";

export class Home extends Component {
    render() {

        const { settings, t, notifications } = this.props
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
                    background: "rgb(52, 199, 89)"
                }
            },
            {
                label: t("apps.phone.apps.home.messages-label"),
                app: "messages-all",
                icon: <i className="fas fa-comment" />,
                styles: {
                    background: "rgb(52, 199, 89)"
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
            { 
                label: t("apps.phone.apps.home.images-label"),
                app: "images",
                func: "onImagesOpen",
                icon: <i className="fas fa-th" />,
                styles: {
                    background: "rgb(88, 86, 214)"
                }
            }
        ]

        return (
            <div className="app">
                <div className="home-container">
                    {apps.map(({ app, label, styles, icon, data, func }, i) => {
                        const style = (theme.type === "default") ? styles : theme.style
                        const labelStyle = { color: dark ? "white" : "black" }
                        const row = Math.floor(i / 4)
                        const column = i % 4
                        let notification = null
                        
                        notifications.forEach((_notification) => {
                            if (_notification.app === app) notification = _notification
                        })

                        return (
                            <div className="home-app" data-app={JSON.stringify({ app, data })} data-func={func} data-class="home-app-selected" data-pos={[row, column]} key={i}>
                                {notification ? <div className="home-app-notification">{notification.notifications.length}</div>: null}
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
        const app = JSON.parse(data.app)
        const { func } = data
        
        if (func && this[func]) this[func]()

        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath(app.app)
    }

    onImagesOpen = () => {
        const { UIXSetImage, UIXSetImages, t } = this.props
        let images = this.props.images
        let image = {
            quit: "images",
            link: "",
            action: {
                icon: "fas fa-trash",
                action: "throwImage",
                label: t("apps.phone.apps.images.throw"),
            }
        }
        images.quit = "home"
        UIXSetImage(image)
        UIXSetImages(images)
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

    enter = ({ dataset }) => { this.openApp(dataset) }
    focus = (element) => {
        window.localStorage.setItem("home", JSON.stringify(element.pos))
    }
    backspace = (data) => { }
    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

}

const mapStateToProps = ({ phone }) => ({
    notifications: phone.apps.notifications,
    images: phone.apps.images,
    settings: phone.settings,
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath,
    UIXSetImages,
    UIXSetImage
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Home))
