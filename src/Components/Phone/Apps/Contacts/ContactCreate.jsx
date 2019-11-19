import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation, UIXPhoneSetPath,
    UIXPhoneUpdateContacts
} from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import { v4 as uuid } from 'uuid';
import "./contacts.css";

export class ContactCreate extends Component {

    state = { focus: false, validated: false, inputs: { label: "", number: "" } }

    render() {

        const { inputs, validated } = this.state
        const { label, number } = inputs
        const { settings, t } = this.props
        const { darkMode } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app">
                <div className="contacts" style={{ background: color_s }}>

                    <div className="contact-create-top" style={{ background: color_s }}>
                        <div data-pos={[0, 0]} data-func="backspace" data-class="contact-create-quit-selected" className="contact-create-quit contact-create-nav-element">
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="contact-create-label" style={{ color: color_t }}>{t("apps.phone.apps.contact-create.label")}</div>
                    </div>

                    <div className="contact-create-middle" style={{ background: color_p }}>
                        <div className="contact-create-image-container">
                            <div className="contact-create-image">
                                {label ? label[0].toUpperCase() : <i className="fas fa-user" />}
                            </div>
                        </div>
                        <div className="contact-create-inputs">
                            <div>
                                <input
                                    name="label"
                                    value={label}
                                    onChange={this.handleInput}
                                    onFocus={() => this.setState({ focus: true })}
                                    onBlur={() => this.setState({ focus: false })}
                                    className="contact-create-inputs-input contact-create-nav-element"
                                    data-pos={[1, 0]}
                                    placeholder={t("apps.phone.apps.contact-create.input-label-placeholder")}
                                    style={{ color: color_t }} />
                            </div>
                            <div>
                                <input
                                    name="number"
                                    value={number}
                                    onChange={this.handleInput}
                                    onFocus={() => this.setState({ focus: true })}
                                    onBlur={() => this.setState({ focus: false })}
                                    className="contact-create-inputs-input contact-create-nav-element"
                                    data-pos={[2, 0]}
                                    placeholder={t("apps.phone.apps.contact-create.input-number-placeholder")}
                                    style={{ color: color_t }} />
                            </div>
                        </div>
                        <div
                            data-func="createContact"
                            className="contact-create-btn contact-create-nav-element"
                            style={{ opacity: validated ? "1" : "0.6" }}
                            data-pos={[3, 0]}
                            data-class="contact-create-btn-selected">
                            {t("apps.phone.apps.contact-create.btn-label")}
                        </div>
                    </div>

                </div>
            </div >
        )
    }

    exited = () => { }
    focus = (element) => { window.localStorage.setItem("contact-create", JSON.stringify(element.pos)) }
    enter = ({ dataset }) => { if (dataset.func && this[dataset.func]) this[dataset.func]() }

    createContact = () => {
        const { state, props, backspace } = this
        const { validated, inputs } = state
        const { UIXPhoneUpdateContacts } = props
        const { label, number } = inputs
        if (!validated) return
        let contact = { number, id: uuid() }
        if (label) contact.label = label
        let contacts = this.props.contacts
        contacts.push(contact)
        UIXPhoneUpdateContacts(contacts)
        backspace()
    }

    handleInput = ({ target }) => {
        const { state } = this
        const { name, value } = target

        let inputs = state.inputs
        inputs[name] = value
        this.setState({ inputs }, () => {
            if (state.inputs.number.length) this.setState({ validated: true })
            if (!state.inputs.number.length) this.setState({ validated: false })
        })
    }

    backspace = () => {
        if (this.state.focus) return
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetPath("contacts")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "contact-create") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const { darkMode } = settings
        const elements = Array.from(document.getElementsByClassName("contact-create-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("contact-create")
        if (item) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }

        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(darkMode)
    }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings,
    contacts: phone.apps.contacts
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneUpdateContacts,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ContactCreate))