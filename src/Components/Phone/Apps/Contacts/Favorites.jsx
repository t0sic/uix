import { 
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath,
    UIXPhoneSetContact
} from "../../../../redux/actions/phoneActions";
import { numberFormater } from "../../Main/numberFormater";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./contacts.css";

export class Favorites extends Component {
    render() {

        const { settings, t } = this.props
        const { darkMode } = settings
        const favorites = this.favorites()
        const notifications = this.notifications()
        const color_t_i = darkMode ? "rgb(229, 229, 234)" : "rgb(44, 44, 46)"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app">
                <div className="contacts" style={{ background: color_s }}>

                    <div className="contacts-top" style={{ background: color_s }}>
                        <div className="contacts-top-label" style={{ color: color_t }}>{t("apps.phone.apps.contacts-favorites.label")}</div>
                    </div>

                    <div className="contacts-middle" style={{ background: color_p }}>
                        {favorites}
                    </div>

                    <div className="contacts-footer" style={{ background: color_s }}>
                        <div className="contact-footer-col contacts-favorites-nav-element" data-pos={[favorites.length, 0]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-star" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.favorites")}</div>
                        </div>
                        <div className="contact-footer-col contacts-favorites-nav-element" data-focusfunc="openApp" data-param="contacts-recent" data-pos={[favorites.length, 1]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                {notifications.recent ? <div className="contacts-footer-badge">{notifications.recent.length}</div> : null}
                                <i className="fas fa-clock" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.recent")}</div>
                        </div>
                        <div className="contact-footer-col">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-user-friends" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.contacts")}</div>
                        </div>
                        <div className="contact-footer-col">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-hashtag call-icon" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.keypad")}</div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    notifications = () => {
        let notifications = null
        let output = {}

        this.props.notifications.forEach((_notifications) => {
            if (_notifications.app === "contacts") {
                notifications = _notifications.notifications
            }
        })

        if (!notifications) return output

        output.recent = notifications.filter(c => c.type === "recent" )

        return output
    }

    openContact = (data) => {
        const {
            UIXPhoneSetContact,
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetContact({ id: data, quit: "contacts-favorites" })
        UIXPhoneSetPath("contact")
    }

    favorites = () => {
        const { contacts, settings } = this.props
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        const color_b = darkMode ? "rgb(54, 54, 56)" : "rgb(219, 219, 224)"
        const favorites = contacts.filter(c => c.favorite)
        let output = []

        favorites.forEach((contact, i) => {
            const label = contact.label ? contact.label : numberFormater(contact.number)
            output.push(
                <div
                    key={i}
                    data-pos={[i, 0]}
                    data-class="contact-favorite-selected"
                    data-enterfunc="openContact"
                    data-enterdata={contact.id}
                    className="contact-favorite contacts-favorites-nav-element"
                    style={{ color: color_t, borderBottom: "1px solid " + color_b }}
                >
                    {label}
                </div>
            )
        })

        return output
    }

    openApp = (app) => {
        const { UIXPhoneSetPath, UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation } = this.props
        UIXPhoneSetAnimationDuration(0)
        UIXPhoneSetAnitmation("")
        UIXPhoneSetPath(app)
    }

    enter = ({ dataset }) => {
        if (dataset.enterfunc) this[dataset.enterfunc](dataset.enterdata)
    }
    exited = () => { }

    focus = (elem) => {
        if (elem.dataset.focusfunc && this[elem.dataset.focusfunc]) {
            this[elem.dataset.focusfunc](elem.dataset.param)
            return
        }
        window.localStorage.setItem("contacts-favorites", JSON.stringify(elem.pos))
        if (!Array.from(elem.classList).includes("contact-footer-col")) elem.scrollIntoViewIfNeeded()
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath("home")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "contacts-favorites") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("contacts-favorites-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("contacts-favorites")
        if (item && navigation.isPosition(JSON.parse(item))) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        } else {
            navigation.position.horizontal = 0
            navigation.position.vertical = this.favorites().length
        }
        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(settings.darkMode)
    }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings,
    contacts: phone.apps.contacts,
    notifications: phone.apps.notifications,
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetContact,
    UIXPhoneSetPath,
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Favorites))
