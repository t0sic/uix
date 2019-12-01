import {
    UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetDarkBackground,
    UIXPhoneUpdateContacts, UIXSetContactCreateInput
} from "../../../../redux/actions/phoneActions";
import { numberFormater } from "../../Main/numberFormater";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./contacts.css";

export class Contact extends Component {
    render() {

        const { settings, t } = this.props
        let contact = this.contact()
        if (!contact) contact = { label: "Karim Tonfisk", number: "0", favorite: false }
        const { label, number, favorite, isNotContact } = contact
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        let factor = 0
        if (!label) factor++

        return (
            <div className="app">
                <div className="contacts" style={{ background: color_s }}>

                    <div className="contact-top" style={{ background: color_s }}>

                        <div className="contact-top-image-container">
                            <div className="contact-top-image">
                                {label ? label[0].toUpperCase() : <i className="fas fa-user" />}
                            </div>
                        </div>
                        <div className="contact-label" style={{ color: color_t }}>{label ? label : numberFormater(number)}</div>
                        <div className="contact-actions">
                            <div className="contact-nav-element" data-pos={[0, 0]} data-func="message" data-class="contact-action-selected"><i className="fas fa-comment" /></div>
                            <div className="contact-nav-element" data-pos={[0, 1]} data-func="call" data-class="contact-action-selected"><i className="fas fa-phone" /></div>
                            <div className="contact-nav-element" data-pos={[0, 2]} style={{opacity: isNotContact ? "0.5" : "1"}} data-func="favorite" data-class="contact-action-selected"><i className="fas fa-star" /></div>
                            <div className="contact-nav-element" data-pos={[0, 3]} style={{opacity: isNotContact ? "0.5" : "1"}} data-func="delete" data-class="contact-action-selected"><i className="fas fa-trash" /></div>
                        </div>

                    </div>

                    <div className="contact-middle" style={{ background: color_p }}>

                        <div className="contact-info contact-nav-element" data-pos={[1, 0]} data-class="contact-info-selected" style={{ color: color_t }}>
                            <label>{t("apps.phone.apps.contact.iPhone")}</label>
                            <div>{numberFormater(number)}</div>
                        </div>
                        {label ?
                            <div className="contact-info contact-nav-element" data-pos={[2, 0]} data-class="contact-info-selected" style={{ color: color_t }}>
                                <label>{t("apps.phone.apps.contact.name")}</label>
                                <div>{label}</div>
                            </div> : null}
                        <div className="contact-info contact-nav-element" data-pos={[3 - factor, 0]} data-class="contact-info-selected" style={{ color: color_t }}>
                            <label>{t("apps.phone.apps.contact.favorite")}</label>
                            <div>{favorite ?
                                <span>{t("apps.phone.apps.contact.is-favorite-label")}</span> :
                                <span>{t("apps.phone.apps.contact.is-not-favorite-label")}</span>
                            }</div>
                        </div>

                        <div className="contact-info contact-nav-element" data-func="message" data-pos={[4 - factor, 0]} data-class="contact-info-selected" style={{ color: color_t, marginTop: "4%" }}>
                            <div>{t("apps.phone.apps.contact.send-message")}</div>
                        </div>
                        <div className="contact-info contact-nav-element" data-func="shareLocation" data-pos={[5 - factor, 0]} data-class="contact-info-selected" style={{ color: color_t, marginTop: "4%" }}>
                            <div>{t("apps.phone.apps.contact.share-my-location")}</div>
                        </div>
                        { isNotContact ? 
                            <div className="contact-info contact-nav-element" data-func="addContact" data-pos={[6 - factor, 0]} data-class="contact-info-selected" style={{ color: color_t, marginTop: "4%" }}>
                                <div>{t("apps.phone.apps.contact.add-contact")}</div>
                            </div> : null 
                        }

                    </div>

                </div>
            </div>
        )
    }

    addContact = () => {
        const { UIXSetContactCreateInput, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, contact } = this.props
        UIXSetContactCreateInput({ label: "", number: contact.id, quit: "contact" })
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetPath("contact-create")
    }

    contact = () => {
        const { contacts, contact } = this.props
        let output = null

        contacts.forEach((elem) => {
            if (contact.id === elem.id) output = elem
        })

        if (!output) output = { number: contact.id, isNotContact: true }

        return output
    }

    favorite = () => {
        const { UIXPhoneUpdateContacts, contact } = this.props
        let contacts = this.props.contacts
        contacts.forEach((elem, i) => {
            if (elem.id === contact.id) contacts[i].favorite = !contacts[i].favorite
        })
        UIXPhoneUpdateContacts(contacts)
    }

    delete = () => {
        const { UIXPhoneUpdateContacts, contact } = this.props
        let contacts = this.props.contacts
        let filtered = contacts.filter((c) => c.id !== contact.id)
        UIXPhoneUpdateContacts(filtered)
        this.backspace()
    }

    enter = ({ dataset }) => {
        if (dataset.func && this[dataset.func]) this[dataset.func]()
    }

    exited = () => { }
    focus = (element) => { window.localStorage.setItem("contact", JSON.stringify(element.pos)) }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, contact } = this.props
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetPath(contact.quit)
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "contact") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const { darkMode } = settings
        const elements = Array.from(document.getElementsByClassName("contact-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("contact")
        if (item && navigation.isPosition(JSON.parse(item))) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }

        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(darkMode)
    }

}

const mapStateToProps = ({ phone }) => ({
    contact: phone.apps.contact,
    contacts: phone.apps.contacts,
    settings: phone.settings
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXSetContactCreateInput,
    UIXPhoneUpdateContacts,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Contact))
