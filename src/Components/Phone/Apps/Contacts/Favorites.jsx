import { UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./contacts.css";

export class Favorites extends Component {
    render() {

        const { settings, t } = this.props
        const { darkMode } = settings
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

                    </div>

                    <div className="contacts-footer" style={{ background: color_s }}>
                        <div className="contact-footer-col contacts-favorites-nav-element" data-pos={[0, 0]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-star" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.favorites")}</div>
                        </div>
                        <div className="contact-footer-col contacts-favorites-nav-element" data-focusfunc="openApp" data-param="contacts-recent" data-pos={[0, 1]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
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
        }
        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(settings.darkMode)
    }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings,
    contacts: phone.apps.contacts
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Favorites))
