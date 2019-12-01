import { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetDarkBackground } from "../../../../redux/actions/phoneActions";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./camera.css";

export class Images extends Component {

    render() {

        const { settings, t } = this.props
        const { darkMode } = settings
        const images = this.images()
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app">
                <div className="images" style={{ background: color_p, color: color_t }}>

                    <div className="images-top" style={{background: color_s}}>
                        <div className="images-top-label">{t("apps.phone.apps.images.label")}</div>
                    </div>

                    <div className="images-middle" style={{background: color_p}}>
                        {images}
                    </div>

                </div>
            </div>
        )
    }

    getCallTime = (time) => {
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

    images = () => {
        const { settings } = this.props
        const images = this.props.images.images
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        let output = []
        let x = 0, y = 0, counter = 0

        images.sort((a,b) => new Date(b.time) - new Date(a.time))

        images.forEach((image, i) => {
            const { link, time } = image
            let inserted = false

            if (i === 0) {
                output.push(<div key={Math.random()} className="images-time-separator" style={{ color: color_t }}>{this.getCallTime(time)}</div>)
            } else if (images[i - 1]) {
                let date = images[i - 1].time - images[i].time
                if (date.toString().length >= 8) {
                    inserted = true
                    counter = 0
                    output.push(<div key={Math.random()} className="images-time-separator" style={{ color: color_t }}>{this.getCallTime(time)}</div>)
                }
            }


            if ((counter % 4 === 0 && i !== 0) || inserted) {
                x = 0
                y++
            }

            output.push(<div key={i} data-pos={[y, x]} className="images-image" data-class="images-image-selected" style={{background: `url(${link})`}} />)
            x++
            counter++
        })

        return output
    }

    enter = ({ dataset }) => { }
    exited = () => { }

    focus = (element) => { 
        window.localStorage.setItem("images", JSON.stringify(element.pos)) 
        element.scrollIntoViewIfNeeded()
    }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, images } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath(images.quit)
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "images") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("images-image"))
        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("images")
        if (item && navigation.isPosition(JSON.parse(item))) {
            navigation.position.horizontal = JSON.parse(item)[1]
            navigation.position.vertical = JSON.parse(item)[0]
        }
        navigation.handleSelected()
        setKeyNav(navigation)
        UIXPhoneSetDarkBackground(settings.darkMode)
    }


}

const mapStateToProps = ({ phone }) => ({
    settings: phone.settings,
    images: phone.apps.images
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetDarkBackground, 
    UIXPhoneSetAnitmation, 
    UIXPhoneSetPath
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Images))
