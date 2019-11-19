import { UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetContact } from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./contacts.css";

export class Recent extends Component {
    render() {

        const { settings, t } = this.props
        const { darkMode } = settings
        const color_t_i = darkMode ? "rgb(229, 229, 234)" : "rgb(44, 44, 46)"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const recent = this.recent()

        return (
            <div className="app">
                <div className="contacts" style={{ background: color_s }}>

                    <div className="contacts-top" style={{ background: color_s }}>
                        <div className="contacts-top-label" style={{ color: color_t }}>{t("apps.phone.apps.contacts-recent.label")}</div>
                    </div>

                    <div className="contacts-middle" style={{ background: color_p }}>
                        {recent}
                    </div>

                    <div className="contacts-footer" style={{ background: color_s }}>
                        <div className="contact-footer-col contacts-recent-nav-element" data-focusfunc="openApp" data-param="contacts-favorites" data-pos={[recent.length, 0]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-star" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.favorites")}</div>
                        </div>
                        <div className="contact-footer-col contacts-recent-nav-element" data-pos={[recent.length, 1]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-clock" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.recent")}</div>
                        </div>
                        <div className="contact-footer-col contacts-recent-nav-element" data-focusfunc="openApp" data-param="contacts" data-pos={[recent.length, 2]} data-class="contact-footer-icon-selected">
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

    getCallTime(time) {
        const { t } = this.props
        let old = new Date(time), curr = new Date()
        let days = [
            t("basic.days.monday"),
            t("basic.days.tuesday"),
            t("basic.days.wednesday"),
            t("basic.days.thursday"),
            t("basic.days.friday"),
            t("basic.days.saturday"),
            t("basic.days.sunday")
        ]

        let hours = old.getHours() < 10 ? "0" + old.getHours() : old.getHours()
        let minutes = old.getMinutes() < 10 ? "0" + old.getMinutes() : old.getMinutes()

        let date = old.getDate() < 10 ? "0" + old.getDate() : old.getDate()
        let month = old.getMonth() < 10 ? "0" + (old.getMonth() + 1) : (old.getMonth() + 1)

        if ((old.getTime() + 48 * 1000 * 3600) > curr.getTime()) {
            if (curr.getDate() === old.getDate()) {
                return hours + ":" + minutes
            } else if (curr.getDate() - 1 === old.getDate()) {
                return t("basic.days.yesterday")
            }
        } else if ((old.getTime() + 7 * 24 * 1000 * 3600) > curr.getTime()) {
            if (old.getDay()) {
                return days[old.getDay() - 1]
            } else {
                return t("basic.days.sunday")
            }
        } else {
            return old.getFullYear() + "-" + month + "-" + date
        }
    }

    getContactFromNumber = (number) => {
        const { contacts } = this.props
        let output = null

        contacts.forEach((contact) => {
            if (contact.number === number) output = contact
        })  
        
        if (!output) output = { number }

        return output
    }

    recent = () => {
        const { recent, settings } = this.props
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        const color_b = darkMode ? "rgb(54, 54, 56)" : "rgb(219, 219, 224)"
        let output = []

        recent.forEach((caller, i) => {
            const { number, time, missed } = caller
            const contact = this.getContactFromNumber(number)
            const label = contact.label ? contact.label : contact.number

            output.push(
                <div 
                    key={i} 
                    style={{ color: color_t, borderBottom: "1px solid " + color_b }} 
                    data-pos={[i, 1]} 
                    data-enterfunc="openContact"
                    data-enterdata={contact.id ? contact.id : number}
                    className="contacts-recent-call contacts-recent-nav-element"
                    data-class="contacts-recent-selected"
                >
                    <div className="contacts-recent-call-label" style={{color: missed ? "#fc3d39": ""}}>{label}</div>
                    <div className="contacts-recent-call-time">{this.getCallTime(time)}</div>
                </div>
            )
        })


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
        UIXPhoneSetContact({ id: data, quit: "contacts-recent" })
        UIXPhoneSetPath("contact")
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
        window.localStorage.setItem("contacts-recent", JSON.stringify(elem.pos))
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
        if (detail.app !== "contacts-recent") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("contacts-recent-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("contacts-recent")
        if (item && navigation.isPosition(JSON.parse(item))) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        } else {
            navigation.position.horizontal = 1
            navigation.position.vertical = 0
        }
        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(settings.darkMode)
    }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings,
    contacts: phone.apps.contacts,
    recent: phone.apps.recent
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetContact,
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Recent))
