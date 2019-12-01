import { numberFormater } from "../../Main/numberFormater";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetContact
} from "../../../../redux/actions/phoneActions";

export class Keypad extends Component {

    state = {input: ""}

    render() {
        const { settings, t } = this.props
        const { input } = this.state
        const { darkMode } = settings
        const notifications = this.notifications()
        const color_t_i = darkMode ? "rgb(229, 229, 234)" : "rgb(44, 44, 46)"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app" style={{ background: color_p }}>
                <div className="contacts" style={{ background: color_s }}>

                    <div className="contacts-keypad-middle" style={{ background: color_p }}>
                        <div className="contacts-keypad-input" style={{color: color_t}}>{numberFormater(input)}</div>
                        <div className="contacts-keypad">
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="1" data-class="keypad-circle-selected" data-pos={[0, 0]} style={{background: color_s, color: color_t}}>1</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="2" data-class="keypad-circle-selected" data-pos={[0, 1]} style={{background: color_s, color: color_t}}>2</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="3" data-class="keypad-circle-selected" data-pos={[0, 2]} style={{background: color_s, color: color_t}}>3</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="4" data-class="keypad-circle-selected" data-pos={[1, 0]} style={{background: color_s, color: color_t}}>4</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="5" data-class="keypad-circle-selected" data-pos={[1, 1]} style={{background: color_s, color: color_t}}>5</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="6" data-class="keypad-circle-selected" data-pos={[1, 2]} style={{background: color_s, color: color_t}}>6</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="7" data-class="keypad-circle-selected" data-pos={[2, 0]} style={{background: color_s, color: color_t}}>7</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="8" data-class="keypad-circle-selected" data-pos={[2, 1]} style={{background: color_s, color: color_t}}>8</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="9" data-class="keypad-circle-selected" data-pos={[2, 2]} style={{background: color_s, color: color_t}}>9</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="*" data-class="keypad-circle-selected" data-pos={[3, 0]} style={{background: color_s, color: color_t}}>*</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="0" data-class="keypad-circle-selected" data-pos={[3, 1]} style={{background: color_s, color: color_t}}>0</div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="addToInput" data-args="#" data-class="keypad-circle-selected" data-pos={[3, 2]} style={{background: color_s, color: color_t}}>#</div>
                            <div className="keypad-circle" />
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="openContact" data-class="keypad-circle-call-selected" data-pos={[4, 1]} style={{background: "rgb(52, 199, 89)", fontSize: "100%"}}>
                                <i className="fas fa-phone" />
                            </div>
                            <div className="keypad-circle contacts-keypad-nav-element" data-func="removeFromInput" data-class="keypad-circle-selected" data-pos={[(input.length) ? 4 : 30, 2]} style={{color: color_t, display: input.length ? "flex" : "none"}}>
                                <i className="fas fa-backspace" />
                            </div>
                        </div>
                    </div>

                    <div className="contacts-footer" style={{ background: color_p, borderTop: "2px solid transparent" }}>
                        <div className="contact-footer-col">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-star" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.favorites")}</div>
                        </div>
                        <div className="contact-footer-col" data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                {notifications.recent ? <div className="contacts-footer-badge">{notifications.recent.length}</div> : null}
                                <i className="fas fa-clock" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.recent")}</div>
                        </div>
                        <div className="contact-footer-col contacts-keypad-nav-element" data-focusfunc="openApp" data-param="contacts" data-pos={[5, 0]} data-class="contact-footer-icon-selected">
                            <div className="contacts-footer-icon">
                                <i className="fas fa-user-friends" style={{ color: color_t_i }} />
                            </div>
                            <div className="contacts-footer-label" style={{ color: color_t_i }}>{t("apps.phone.apps.contacts-footer.contacts")}</div>
                        </div>
                        <div className="contact-footer-col contacts-keypad-nav-element" data-pos={[5, 1]} data-class="contact-footer-icon-selected">
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

    openContact = () => {
        if (!this.state.input.length) return
        const {
            UIXPhoneSetContact,
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetContact({ id: this.state.input, quit: "contacts-keypad" })
        UIXPhoneSetPath("contact")
    }

    openApp = (app) => {
        const { UIXPhoneSetPath, UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation } = this.props
        UIXPhoneSetAnimationDuration(0)
        UIXPhoneSetAnitmation("")
        UIXPhoneSetPath(app)
    }

    focus = (elem) => {
        if (elem.dataset.focusfunc && this[elem.dataset.focusfunc]) {
            this[elem.dataset.focusfunc](elem.dataset.param)
            return
        }
        window.localStorage.setItem("contacts-keypad", JSON.stringify(elem.pos))
        if (!Array.from(elem.classList).includes("contact-footer-col")) elem.scrollIntoViewIfNeeded()
    }

    removeFromInput = () => {
        let input = this.state.input
        input = input.substring(0, input.length - 1)
        this.setState({ input })
    }

    createNav = () => {
        const elements = Array.from(document.getElementsByClassName("contacts-keypad-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => {if (this[event]) this[event](data) })
        const item = window.localStorage.getItem("contacts-keypad")
        if (item) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        } else {
            navigation.position.horizontal = 1
            navigation.position.vertical = 5
        }
        navigation.handleSelected()

        this.props.setKeyNav(navigation)
    }

    addToInput = (str) => {
        this.createNav()
        let input = this.state.input
        input += str
        this.setState({ input })
    }

    enter = ({ dataset }) => {if (dataset.func && this[dataset.func]) this[dataset.func](dataset.args)}

    exited = () => { }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("home")
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    handleEvent = ({ detail }) => {
        if (detail.app !== "contacts-keypad") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { UIXPhoneSetDarkBackground, settings } = this.props
        this.createNav()

        UIXPhoneSetDarkBackground(settings.darkMode)
    }

}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings,
    notifications: phone.apps.notifications,
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetContact,
    UIXPhoneSetPath,
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Keypad))
