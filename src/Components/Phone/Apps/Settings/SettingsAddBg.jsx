import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetCustomBackground,
    UIXSetImages, UIXSetImage, UIXSetAddBackgroundInput
} from "../../../../redux/actions/phoneActions";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import Loading from "../../Main/Loading";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import { v4 as uuid } from 'uuid';
import "./settings.css";

export class SettingsAddBg extends Component {

    state = {
        validated: false,
        loader: false,
        locked: false,
    }
    

    render() {
        const { inputs, settings, t } = this.props
        const { validated, loader } = this.state
        const { url, label } = inputs
        const { darkMode } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app" style={{ background: color_p }}>
                <CSSTransition
                    timeout={500}
                    classNames="default"
                    unmountOnExit
                    appear={true}
                    in={loader}
                >
                    <Loading />
                </CSSTransition>
                <div className="settings" style={{ background: color_p }}>

                    <div className="settings-top" style={{ background: color_s }}>
                        <div data-pos={[0, 0]} data-func="backspace" data-class="settings-quit-selected" className="settings-quit settings-add-background-nav-element">
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="settings-label" style={{ color: color_t }}>{t("apps.phone.apps.settings-background-add.label")}</div>
                    </div>

                    <div className="settings-middle">

                        <div className="settings-middle-add-bg-input-container">
                            <label style={{ color: color_t }}>{t("apps.phone.apps.settings-background-add.input-url")}</label>
                            <input
                                name="url"
                                onBlur={() => this.setState({ focus: false })}
                                onFocus={() => this.setState({ focus: true })}
                                className="settings-add-background-nav-element"
                                value={url}
                                onChange={({ target }) => this.handleChange(target)}
                                data-pos={[1, 0]} 
                                spellCheck={false}
                                style={{ backgroundColor: color_s, color: color_t }} />
                            <div 
                                className="settings-add-background-choose-from-camera-roll settings-add-background-nav-element"
                                data-class="settings-add-background-choose-from-camera-roll-selected"
                                data-pos={[2, 0]}
                                data-func="chooseImage"
                            >
                                <span>{t("apps.phone.apps.settings-background-add.choose-from-camera-roll")}</span>
                                <i className="fas fa-share"></i>
                            </div>
                            <br />
                            <label style={{ color: color_t }}>{t("apps.phone.apps.settings-background-add.input-label")}</label>
                            <input
                                name="label"
                                onBlur={() => this.setState({ focus: false })}
                                onFocus={() => this.setState({ focus: true })}
                                className="settings-add-background-nav-element"
                                value={label}
                                onChange={({ target }) => this.handleChange(target)}
                                data-pos={[3, 0]}
                                spellCheck={false}
                                style={{ backgroundColor: color_s, color: color_t }} />
                        </div>
                        <div className="settings-middle-add-bg-button-container">
                            <div 
                                data-func="add" 
                                className="settings-add-background-nav-element"
                                style={{ opacity: validated ? "1" : "0.6" }} 
                                data-pos={[4, 0]} 
                                data-class="settings-middle-add-bg-button-selected" 
                                id="settings-bg-add-btn"
                            >
                                {t("apps.phone.apps.settings-background-add.btn-label")}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

    chooseImage = () => {
        const { UIXSetImage, UIXSetImages, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, t } = this.props
        let images = this.props.images
        let image = {
            quit: "images",
            link: "",
            action: {
                icon: "fas fa-share",
                action: "backgroundAdd",
                label: t("apps.phone.apps.settings-background-add.image-choose-label"),
            }
        }
        images.quit = "settings-background-add"
        UIXSetImages(images)
        UIXSetImage(image)
        UIXPhoneSetAnitmation("slide-1")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("images")
    }

    handleChange = ({ name, value }) => {
        const { UIXSetAddBackgroundInput } = this.props
        let inputs = this.props.inputs
        inputs[name] = value
        UIXSetAddBackgroundInput(inputs)
        this.testImage(this.props.inputs.url, (res, state) => {
            if (this.props.inputs.label && state === "success" && this.props.inputs.label.length > 0) this.setState({ validated: true })
        })
    }

    testImage = (url, callback, timeout) => {
        timeout = timeout || 5000
        let timedOut = false, timer
        let img = new Image()
        img.onerror = img.onabort = () => {
            if (!timedOut) {
                clearTimeout(timer)
                callback(url, "error")
            }
        }
        img.onload = () => {
            if (!timedOut) {
                clearTimeout(timer)
                callback(url, "success")
            }
        }
        img.src = url
        timer = setTimeout(() => {
            timedOut = true
            img.src = "//!!!!/test.jpg"
            callback(url, "timeout")
        }, timeout)
    }

    add = () => {
        const { validated, locked } = this.state
        if (!validated && locked) return
        const { settings, UIXPhoneSetCustomBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, inputs } = this.props
        this.setState({loader: true, locked: true})
        const customBackgrounds = settings.customBackgrounds
        const { url, label } = inputs
        this.dark(url, (dark) => {
            const customBg = { id: uuid(), label, url, dark }
            customBackgrounds.push(customBg)
            UIXPhoneSetCustomBackground(customBackgrounds)
            UIXPhoneSetAnitmation("slide-2")
            UIXPhoneSetAnimationDuration(300)
            UIXPhoneSetPath("settings-background")
            this.setState({loader: false, locked: false})
        })
    }

    dark = (url, cb) => {

        function toDataUrl(url, callback) {
            try {
                let xhr = new XMLHttpRequest()
                xhr.onload = function () {
                    var reader = new FileReader()
                    reader.onloadend = function () {
                        callback(reader.result)
                    }
                    reader.readAsDataURL(xhr.response)
                }
                xhr.open("GET", url)
                xhr.responseType = "blob"
                xhr.send()     
            } catch (error) {
                this.setState({loader: false})
            }
        }

        let proxyUrl = "https://cors-anywhere.herokuapp.com/",
            targetUrl = url
        toDataUrl(proxyUrl + targetUrl, (data) => {
            this.getImageLightness(data, (lightness) => {
                console.log(lightness)
                if (lightness >= 220) {
                    cb(false)
                } else {
                    cb(true)
                }
            })
        })
    }

    getImageLightness = (imageSrc, callback) => {
        let img = document.createElement("img")
        img.src = imageSrc
        img.style.display = "none"
        document.body.appendChild(img)

        let colorSum = 0

        img.onload = function () {
            let canvas = document.createElement("canvas")
            canvas.width = this.width
            canvas.height = this.height

            let ctx = canvas.getContext("2d")
            ctx.drawImage(this, 0, 0)

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            let data = imageData.data
            let r, g, b, avg

            for (let x = 0, len = data.length; x < len; x += 4) {
                r = data[x]
                g = data[x + 1]
                b = data[x + 2]

                avg = Math.floor((r + g + b) / 3)
                colorSum += avg
            }

            let brightness = Math.floor(colorSum / (this.width * this.height))
            callback(brightness)
        }
    }

    focus = (element) => {
        window.localStorage.setItem("settings-background-add", JSON.stringify(element.pos))
    }
    exited = () => { }
    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    enter = ({ dataset }) => {
        if (dataset.func) this[dataset.func]()
    }

    backspace = () => {
        if (this.state.focus) return
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-background")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "settings-background-add") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("settings-add-background-nav-element"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("settings-background-add")
        if (item) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }
        navigation.handleSelected()

        UIXPhoneSetDarkBackground(settings.darkMode)
        setKeyNav(navigation)
    }

}

const mapStateToProps = ({ phone }) => ({
    inputs: phone.apps.settingAddBackgroundInputs,
    settings: phone.settings,
    images: phone.apps.images,
    image: phone.apps.image,
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetCustomBackground,
    UIXPhoneSetDarkBackground,
    UIXSetAddBackgroundInput,
    UIXPhoneSetAnitmation,
    UIXPhoneSetPath,
    UIXSetImages,
    UIXSetImage,
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SettingsAddBg))
