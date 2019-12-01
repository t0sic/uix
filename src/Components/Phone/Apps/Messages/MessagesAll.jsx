import { UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation, UIXPhoneSetPath, UIXPhoneSetDarkBackground } from "../../../../redux/actions/phoneActions";
import { numberFormater } from "../../Main/numberFormater";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import Keynav from "../../Main/KeyNav";
import { connect } from "react-redux";

export class MessagesAll extends Component {
    render() {

        const { t, settings } = this.props
        const { darkMode } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const conversations = this.conversations()
 
        return (
            <div className="app">
                <div className="messages-all" style={{background: color_p}}>

                    <div className="messages-all-top" style={{background: color_s}}>
                        <div className="messages-all-top-label" style={{color: color_t}}>{t("apps.phone.apps.messages-all.label")}</div>
                    </div>

                    <div className="messages-all-middle">
                        {conversations}
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


    conversations = () => {
        const { contacts, settings, conversations } = this.props
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        let output = []
        let notifications = null

        this.props.notifications.forEach((_notifications) => {
            if (_notifications.app === "messages-all") notifications = _notifications
        })

        conversations.forEach((conversation, i) => {
            const { text, number, time } = conversation
            let person = null
            let notification = null

            if (notifications) {
                notifications.notifications.forEach((_notification) => {
                    if (_notification.number === number) notification = _notification
                })
            }

            contacts.forEach(contact => {if (contact.number === number) person = contact })
            if (!person) person = { number }

            const truncateString = (str, num) => {
                if (str.length <= num) {
                    return str
                }
                return str.slice(0, num) + "..."
            }

            output.push(
                <div 
                    key={i} 
                    data-pos={[i, 0]}
                    className="recent-message"
                    data-class="recent-message-selected"
                >   
                    {notification ? <div className="recent-message-notification"><div /></div> : null}
                    <div className="recent-message-content">
                        <div className="recent-message-image">
                            <div>{person.label ? person.label[0].toUpperCase() : <i className="fas fa-user" />}</div>
                        </div>
                        <div className="recent-message-info">
                            <div className="recent-message-time-and-name">
                                <div className="recent-message-name" style={{color: color_t}}>{person.label ? person.label : numberFormater(person.number)}</div>
                                <div className="recent-message-time" style={{color: color_t}}>{this.getCallTime(time)}</div>
                            </div>
                            <div className="recent-message-message" style={{color: color_t}}>{truncateString(text.trim(), 45)}</div>
                        </div>
                    </div>
                </div>
            )

        })


        return output
    }

    quit = () => {
        const { UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetPath("home")
    }

    navigation = () => {
        const { setKeyNav } = this.props
        const elements = Array.from(document.getElementsByClassName("recent-message"))
        const navigation = new Keynav(elements, (event, data) => {if (this[event]) this[event](data) })
        navigation.handleSelected()
        setKeyNav(navigation)
    }

    backspace = () => { this.quit() }
    focus = element => element.scrollIntoViewIfNeeded()
    enter = ({ dataset }) => { if (dataset.func && this[dataset.func]) this[dataset.func]()}

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    handleEvent = ({ detail }) => { if (detail.app === "messages-all" && this[detail.action]) this[detail.action]() }
    entered = () => {
        const { UIXPhoneSetDarkBackground, settings } = this.props
        UIXPhoneSetDarkBackground(settings.darkMode)
        this.navigation()
    }

}

const mapStateToProps = ({phone}) => ({
    settings: phone.settings,
    contacts: phone.apps.contacts,
    conversations: phone.apps.conversations,
    notifications: phone.apps.notifications
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground, 
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(MessagesAll))
