import { UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetContact } from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./contacts.css";

export class Contacts extends Component {
    render() {

        const { settings, t } = this.props
        const { darkMode } = settings
        const color_t_i = darkMode ? "rgb(229, 229, 234)" : "rgb(44, 44, 46)"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const contacts = this.contacts()

        return (
            <div className="app">
                <div className="contacts" style={{ background: color_s }}>

                    <div className="contacts-top" style={{ background: color_s }}>
                        <div className="contacts-top-label" style={{ color: color_t }}>{t("apps.phone.apps.contacts.label")}</div>
                        <div className="contacts-top-add contacts-nav-element" data-enterfunc="addContact" data-pos={[0, 1]} data-class="contacts-top-add-selected">
                            <i className="fas fa-user-plus" style={{ color: color_t_i }} />
                        </div>
                    </div>

                    <div className="contacts-middle" style={{ background: color_p }}>
                        {contacts}
                    </div>

                    <div className="contacts-footer" style={{ background: color_s }}>
                        <div className="contact-footer-col">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-star" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.favorites")}</div>
                        </div>
                        <div className="contact-footer-col contacts-nav-element" data-focusfunc="openApp" data-param="contacts-recent" data-pos={[this.props.contacts.length + 1, 0]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-clock" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.recent")}</div>
                        </div>
                        <div className="contact-footer-col contacts-nav-element" data-pos={[this.props.contacts.length + 1, 1]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-user-friends" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.contacts")}</div>
                        </div>
                        <div className="contact-footer-col contacts-nav-element" data-pos={[this.props.contacts.length + 1, 2]} data-class="contact-footer-icon-selected">
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

    contacts = () => {
        const { settings } = this.props
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_b = darkMode ? "rgb(54, 54, 56)" : "rgb(219, 219, 224)"
        const output = []
        let contacts = this.props.contacts

        contacts.sort((a, b) => {
            if (!a.label) return 1
            if (!b.label) return -1
            let textA = a.label.toUpperCase()
            let textB = b.label.toUpperCase()
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })

        contacts.forEach((contact, i) => {
            const { label, number } = contact
            const l = label ? label : "#"
            if (contacts[i - 1]) {
                const l2 = contacts[i - 1].label ? contacts[i - 1].label : "#"
                if (l2[0] !== l[0]) {
                    output.push(<div key={i + 1 * 20} className="contacts-separator" style={{ color: color_t, background: color_s }}>{l[0]}</div>)
                }
            } else {
                output.push(<div key={i + 1 * 20} className="contacts-separator" style={{ color: color_t, background: color_s }}>{l[0]}</div>)
            }

            let isNextSeperated = false

            if (contacts[i + 1]) {
                const l2 = contacts[i + 1].label ? contacts[i + 1].label : "#"
                if (l2[0] !== l[0]) isNextSeperated = true
            } else isNextSeperated = true

            output.push(
                <div
                    key={i}
                    style={{ color: color_t, borderBottom: !isNextSeperated ? "1px solid " + color_b : "0px" }}
                    className="contacts-contact contacts-nav-element"
                    data-class="contacts-contact-selected"
                    data-enterfunc="openContact"
                    data-enterdata={JSON.stringify(contact)}
                    data-pos={[i + 1, 1]}>
                    {label ? label : number}
                </div>)
        })

        return output
    }

    addContact = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetPath("contact-create")
    }

    openContact = (data) => {
        const {
            UIXPhoneSetContact,
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        const contact = JSON.parse(data)
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetContact({ id: contact.id, quit: "contacts" })
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
        window.localStorage.setItem("contacts", JSON.stringify(elem.pos))
        if (Array.from(elem.classList).includes("contacts-contact")) elem.scrollIntoViewIfNeeded()
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath("home")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "contacts") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings, contacts } = this.props
        const elements = Array.from(document.getElementsByClassName("contacts-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("contacts")
        if (item && navigation.isPosition(JSON.parse(item))) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        } else {
            navigation.position.horizontal = 1
            navigation.position.vertical = contacts.length + 1
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
    UIXPhoneSetContact,
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Contacts))
