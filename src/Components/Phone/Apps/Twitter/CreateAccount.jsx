import {
    UIXSetTwitterInputs,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath,
    UIXSetImages,
    UIXSetImage
} from "../../../../redux/actions/phoneActions"
import { CSSTransition } from "react-transition-group"
import { withTranslation } from "react-i18next"
import React, { Component } from "react"
import KeyNav from "../../Main/KeyNav"
import { connect } from "react-redux"
import "./twitter.css"

export class CreateAccount extends Component {
    render() {
        const { inputs, t } = this.props
        const { name, link } = inputs

        return (
            <div className="app twitter">
                <div className="twitter-create-account">
                    <div className="twitter-create-account-top">
                        <i
                            className="fas fa-chevron-left twitter-create-account-nav-element"
                            data-pos={[0, 0]}
                            data-function="returnToWelcome"
                            data-class="twitter-create-account-chevron-selected"
                        />
                        <i className="fab fa-twitter" />
                    </div>

                    <div className="twitter-create-account-middle">
                        <div className="twitter-create-account-text">
                            {t(
                                "apps.phone.apps.twitter-create-account.create-account-text"
                            )}
                        </div>
                        <div className="twitter-create-account-inputs">
                            <div className="twitter-create-account-input-container">
                                <input
                                    className="twitter-create-account-nav-element"
                                    data-pos={[1, 0]}
                                    value={name}
                                    spellCheck="false"
                                    name="name"
                                    onFocus={() =>
                                        this.setState({ focus: true })
                                    }
                                    onBlur={() =>
                                        this.setState({ focus: false })
                                    }
                                    onChange={({ target }) =>
                                        this.handleChange(target)
                                    }
                                    placeholder={t(
                                        "apps.phone.apps.twitter-create-account.name-input"
                                    )}
                                />
                                <CSSTransition
                                    classNames="scale"
                                    in={name.length ? true : false}
                                    timeout={300}
                                    unmountOnExit
                                >
                                    <div>
                                        <i className="far fa-check-circle" />
                                    </div>
                                </CSSTransition>
                            </div>
                            <div className="twitter-create-account-input-container">
                                <input
                                    className="twitter-create-account-nav-element"
                                    data-pos={[2, 0]}
                                    value={link}
                                    name="link"
                                    spellCheck="false"
                                    onFocus={() =>
                                        this.setState({ focus: true })
                                    }
                                    onBlur={() =>
                                        this.setState({ focus: false })
                                    }
                                    onChange={({ target }) =>
                                        this.handleChange(target)
                                    }
                                    placeholder={t(
                                        "apps.phone.apps.twitter-create-account.link-input"
                                    )}
                                />
                                <CSSTransition
                                    classNames="scale"
                                    in={link.length ? true : false}
                                    timeout={300}
                                    unmountOnExit
                                >
                                    <div>
                                        <i className="far fa-check-circle" />
                                    </div>
                                </CSSTransition>
                            </div>
                            <span
                                className="twitter-create-account-nav-element"
                                data-pos={[3, 0]}
                                data-class="twitter-create-account-chose-from-camera-roll-selected"
                                data-function="chooseFromCameraRoll"
                            >
                                {t(
                                    "apps.phone.apps.twitter-create-account.choose-from-camera-roll"
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="twitter-create-account-bottom">
                        <div className="twitter-create-account-tos">
                            By signing up, you agree to our <span>Terms</span>,{" "}
                            <span>Privacy Policy</span>, and{" "}
                            <span>Cookie Use</span>. You also agree that you're
                            over 16 years old of age.
                        </div>
                        <div
                            style={{
                                opacity:
                                    name.length && link.length ? "1" : "0.6"
                            }}
                            className="twitter-create-account-sing-up twitter-create-account-nav-element"
                            data-pos={[4, 0]}
                            data-class="twitter-create-account-sign-up-btn-selected"
                        >
                            {t(
                                "apps.phone.apps.twitter-create-account.sign-up-btn"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleChange = target => {
        const { UIXSetTwitterInputs } = this.props
        let inputs = this.props.allInputs

        inputs.createAccount[target.name] = target.value

        UIXSetTwitterInputs(inputs)
    }

    exited = () => {}
    focus = () => {}
    backspace = () => {}
    enter = ({ dataset }) => {
        if (dataset.function) this[dataset.function]()
    }

    signUp = () => {
        // TODO
    }

    returnToWelcome = () => {
        const {
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetAnitmation,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("twitter-welcome")
    }

    quit = () => {
        const {
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetAnitmation,
            UIXPhoneSetPath
        } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("home")
    }

    chooseFromCameraRoll = () => {
        const {
            UIXSetImage,
            UIXSetImages,
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath,
            t
        } = this.props
        let images = this.props.images
        let image = {
            quit: "images",
            link: "",
            action: {
                icon: "fas fa-share",
                action: "twitterChooseImage",
                label: t(
                    "apps.phone.apps.settings-background-add.image-choose-label"
                )
            }
        }
        images.quit = "twitter-create-account"
        UIXSetImages(images)
        UIXSetImage(image)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("images")
    }

    icon = value => {
        let icon = null
        if (value.length) icon = <i className="far fa-check-circle" />
        if (!icon) icon = <i />

        return icon
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "twitter-create-account") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() {
        window.addEventListener("phone", this.handleEvent)
    }
    entered = () => {
        const { UIXPhoneSetDarkBackground, setKeyNav } = this.props
        const elements = Array.from(
            document.getElementsByClassName(
                "twitter-create-account-nav-element"
            )
        )
        const navigation = new KeyNav(elements, (event, data) =>
            this[event](data)
        )
        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(false)
    }
}

const mapStateToProps = ({ phone }) => ({
    inputs: phone.apps.twitterInputs.createAccount,
    allInputs: phone.apps.twitterInputs,
    images: phone.apps.images
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXSetTwitterInputs,
    UIXPhoneSetPath,
    UIXSetImages,
    UIXSetImage
}

export default withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
)
