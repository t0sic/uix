import {
    UIXPhoneSetAnitmation,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetPath,
    UIXSetPhoneClasses,
    UIXSetImages,
    UIXSetAddBackgroundInput,
    UIXSetTwitterInputs
} from "../../../../redux/actions/phoneActions"
import { CSSTransition } from "react-transition-group"
import React, { Component } from "react"
import KeyNav from "../../Main/KeyNav"
import { connect } from "react-redux"

export class Index extends Component {
    state = {
        actionBoxOpen: false,
        type: "portrait"
    }

    render() {
        const { actionBoxOpen, type } = this.state
        const { image, settings } = this.props
        const { link, action } = image
        const { label, icon } = action
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"

        return (
            <div className="app" style={{ color: color_t }}>
                <div className="image">
                    <div className="image-inner">
                        <div
                            className={`image-${type}`}
                            style={{ background: `url(${link})` }}
                        />
                    </div>
                </div>
                {
                    <CSSTransition
                        in={actionBoxOpen}
                        classNames="dialog-slide"
                        timeout={500}
                        appear={true}
                        unmountOnExit
                    >
                        <div
                            className="image-action"
                            style={{ background: color_p }}
                        >
                            <div className="image-action-label">{label}</div>
                            <div className="image-action-icon">
                                <i className={icon} />
                            </div>
                        </div>
                    </CSSTransition>
                }
            </div>
        )
    }

    exited = () => {}

    enter = () => {
        if (this.state.actionBoxOpen) {
            if (this[this.props.image.action.action])
                this[this.props.image.action.action]()
        } else {
            this.setState({ actionBoxOpen: true })
        }
    }

    throwImage = () => {
        const { UIXSetImages, image } = this.props
        const { link } = image
        let images = this.props.images
        images.images = images.images.filter(c => c.link !== link)

        UIXSetImages(images)
        this.quit()
    }

    twitterChooseImage = () => {
        const {
            UIXSetPhoneClasses,
            UIXSetTwitterInputs,
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath,
            image
        } = this.props
        const { link } = image
        let inputs = this.props.twitterInputs

        inputs.createAccount.link = link

        UIXSetTwitterInputs(inputs)
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-2")
        UIXSetPhoneClasses("")
        UIXPhoneSetPath("twitter-create-account")
    }

    backgroundAdd = () => {
        const {
            UIXSetPhoneClasses,
            UIXSetAddBackgroundInput,
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath,
            image
        } = this.props
        const { link } = image
        let inputs = this.props.inputs

        inputs.url = link

        UIXSetAddBackgroundInput(inputs)
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("slide-2")
        UIXSetPhoneClasses("")
        UIXPhoneSetPath("settings-background-add")
    }

    quit = () => {
        const {
            UIXPhoneSetAnitmation,
            UIXPhoneSetAnimationDuration,
            UIXPhoneSetPath,
            image,
            UIXSetPhoneClasses
        } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXSetPhoneClasses("")
        UIXPhoneSetPath(image.quit)
    }

    backspace = () => {
        if (this.state.actionBoxOpen) {
            this.setState({ actionBoxOpen: false })
        } else {
            this.quit()
        }
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "image") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() {
        window.addEventListener("phone", this.handleEvent)
        const { image, UIXSetPhoneClasses } = this.props
        const { link } = image

        let img = new Image()
        img.onload = () => {
            const imageIsLandscape = img.width > img.height
            const cameraType = imageIsLandscape ? "landscape" : "portrait"
            UIXSetPhoneClasses("phone-" + cameraType)
            this.setState({ type: cameraType })
        }
        img.src = link
    }

    entered = () => {
        const navigation = new KeyNav([], (event, data) => this[event](data))
        this.props.setKeyNav(navigation)
    }
}

const mapStateToProps = ({ phone }) => ({
    inputs: phone.apps.settingAddBackgroundInputs,
    images: phone.apps.images,
    settings: phone.settings,
    image: phone.apps.image,
    twitterInputs: phone.apps.twitterInputs
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXSetAddBackgroundInput,
    UIXPhoneSetAnitmation,
    UIXSetTwitterInputs,
    UIXSetPhoneClasses,
    UIXPhoneSetPath,
    UIXSetImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
