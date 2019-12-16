import { 
    UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetDarkBackground, UIXSetPhoneClasses, 
    UIXSetDisplayBackground, UIXSetImage
} from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";

export class Camera extends Component {

    state = {
        currentCamera: "PHOTO",
        lastImage: ""
    }
    
    render() {

        const { t } = this.props
        const style = this.style()
        const lastImage = this.lastImage()

        return (
            <div className="app">
                <div className="camera-top" />

                <div className="camera-bottom">
                    <div className="camera-carousel">
                        <div className="camera-carosuel-inner" style={style}>
                            <span data-pos={[1, 1]} data-focusfunc="setCurrentCamera" data-param="SLOW-MO" className="camera-nav-element">{t("apps.phone.apps.camera.slow-mo")}</span>
                            <span data-pos={[1, 2]} data-focusfunc="setCurrentCamera" data-param="LANDSCAPE" className="camera-nav-element">{t("apps.phone.apps.camera.landscape")}</span>
                            <span data-pos={[1, 3]} data-focusfunc="setCurrentCamera" data-param="PHOTO" className="camera-nav-element">{t("apps.phone.apps.camera.photo")}</span>
                            <span data-pos={[1, 4]} data-focusfunc="setCurrentCamera" data-param="PORTRAIT" className="camera-nav-element">{t("apps.phone.apps.camera.portrait")}</span>
                            <span data-pos={[1, 5]} data-focusfunc="setCurrentCamera" data-param="SQUARE" className="camera-nav-element">{t("apps.phone.apps.camera.square")}</span>
                        </div>
                    </div>
                    <div className="text-shadow" />
                    <div className="camera-actions">
                        <div data-pos={[2, 0]} data-class="camera-selected-opacity" data-enterfunc="openLastImage" style={{ background: `url(${lastImage ? lastImage.link : ""})` }} className="camera-last-image camera-nav-element" />
                        <div data-pos={[2, 1]} data-class="camera-selected-opacity" className="camera-take-image camera-nav-element" />
                        <div data-pos={[2, 2]} data-class="camera-selected-opacity" className="camera-rotate camera-nav-element" />
                    </div>
                </div>
            </div>
        )
    }

    style = () => {
        const { currentCamera } = this.state
        let style = { marginLeft: "-10.8%" }

        switch (currentCamera) {
            case "PHOTO":
                style.marginLeft = "-10.8%"
                break;
            case "SLOW-MO":
                style.marginLeft = "10.8%"
                break;
            case "LANDSCAPE":
                style.marginLeft = "-0.4%"
                break;
            case "PORTRAIT":
                style.marginLeft = "-20.8%"
            break;
            case "SQUARE":
                style.marginLeft = "-31.4%"
            break;
            default:
        }
        
        return style
    }

    exited = () => { }
    enter = ({dataset}) => {if (dataset.enterfunc && this[dataset.enterfunc]) this[dataset.enterfunc]()}

    focus = (element) => {
        window.localStorage.setItem("camera", JSON.stringify(element.pos)) 
        const { dataset } = element
        if (dataset.focusfunc === "setCurrentCamera") {
            this.createNavigation()
        }
        if (dataset.focusfunc && this[dataset.focusfunc]) this[dataset.focusfunc](dataset.param)
    }

    openLastImage = () => {
        const { UIXSetImage, UIXSetPhoneClasses, UIXSetDisplayBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, t } = this.props
        const lastImage = this.lastImage()
        if (!lastImage) return

        const image = {
            quit: "camera",
            link: lastImage.link,
            type: "default",
            action: {
                icon: "fas fa-trash",
                label: t("apps.phone.apps.images.throw"),
                action: "throwImage",
            }
        }

        UIXSetImage(image)
        UIXSetPhoneClasses("")
        UIXSetDisplayBackground(true)
        UIXPhoneSetAnitmation("slide-1") 
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("image")
    }

    createNavigation = (cb) => {
        const { setKeyNav } = this.props
        const elements = Array.from(document.getElementsByClassName("camera-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("camera")

        if (item && navigation.isPosition(JSON.parse(item))) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        } else {
            navigation.position.horizontal = 3
            navigation.position.vertical = 1
        }

        document.getElementsByClassName("camera-last-image")[0].pos = [2, navigation.position.horizontal - 1]
        document.getElementsByClassName("camera-take-image")[0].pos = [2, navigation.position.horizontal]
        document.getElementsByClassName("camera-rotate")[0].pos = [2, navigation.position.horizontal + 1]

        setKeyNav(navigation)
        if (cb) cb(navigation)
    }

    lastImage = () => this.props.images.sort((a,b) => new Date(b.time) - new Date(a.time))[0]

    setCurrentCamera = (data) => {
        const { UIXSetPhoneClasses } = this.props
        this.setState({currentCamera: data})
        if (data === "LANDSCAPE") {
            UIXSetPhoneClasses("phone-landscape")
        } else {
            UIXSetPhoneClasses("phone-portrait")
        }
    }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXSetDisplayBackground, UIXSetPhoneClasses } = this.props
        UIXSetPhoneClasses("")
        UIXSetDisplayBackground(true)
        UIXPhoneSetAnitmation("default") 
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath("home")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "camera") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    entered = () => {
        const { UIXPhoneSetDarkBackground, UIXSetPhoneClasses, UIXSetDisplayBackground } = this.props

        this.createNavigation((navigation) => {
            UIXSetPhoneClasses("phone-portrait")
            UIXPhoneSetDarkBackground(true)
            UIXSetDisplayBackground(false)
            navigation.handleSelected()
        })
    }

}

const mapStateToProps = ({ phone }) => ({
    images: phone.apps.images.images
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration, 
    UIXPhoneSetDarkBackground,
    UIXSetDisplayBackground,
    UIXPhoneSetAnitmation, 
    UIXSetPhoneClasses,
    UIXPhoneSetPath,
    UIXSetImage,
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Camera))
