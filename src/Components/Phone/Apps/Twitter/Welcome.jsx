import {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath
} from "../../../../redux/actions/phoneActions"
import { withTranslation } from "react-i18next"
import React, { Component } from "react"
import KeyNav from "../../Main/KeyNav"
import { connect } from "react-redux"
import "./twitter.css"

export class Welcome extends Component {
    render() {
        const { t } = this.props

        return (
            <div className="app twitter">
                <div className="twitter-welcome">
                    <div className="twitter-welcome-top">
                        <i className="fab fa-twitter" />
                    </div>

                    <div className="twitter-welcome-middle">
                        <div className="twitter-welcome-text">
                            {t("apps.phone.apps.twitter-welcome.welcome-text")}
                        </div>
                        <div className="twitter-welcome-create-account-btn">
                            {t(
                                "apps.phone.apps.twitter-welcome.create-account-btn"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    exited = () => {}
    focus = () => {}
    backspace = () => {
        const {
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetAnitmation,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("home")
    }
    enter = () => {
        const {
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetAnitmation,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("twitter-create-account")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "twitter-welcome") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() {
        window.addEventListener("phone", this.handleEvent)
    }
    entered = () => {
        const { UIXPhoneSetDarkBackground, setKeyNav } = this.props
        const navigation = new KeyNav([], (event, data) => this[event](data))
        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(false)
    }
}

const mapStateToProps = ({ phone }) => ({})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath
}

export default withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(Welcome)
)
