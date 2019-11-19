import { withTranslation } from "react-i18next";
import songpop from "../../Audio/songpop.ogg";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./settings.css";
import {
    UIXPhoneSetDarkBackground, UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, UIXPhoneSetRingTone
} from "../../../../redux/actions/phoneActions";

export class SettingsRingTone extends Component {

    state = {
        audio: { id: null, audio: null, playing: null }
    }

    render() {
        const { settings, t } = this.props
        const { darkMode, ringtone } = settings
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"
        const ringtones = [
            { id: 1, ringtone: songpop, label: "See me Fall" },
            { id: 2, ringtone: songpop, label: "See me Fall" },
        ]

        return (
            <div className="app" style={{ background: color_p }}>
                <div className="settings" style={{ background: color_p }}>

                    <div className="settings-top" style={{ background: color_s }}>
                        <div data-pos={[0, 0]} data-func="backspace" data-class="settings-quit-selected" className="settings-quit settings-ringtone-nav-element">
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="settings-label" style={{ color: color_t }}>{t("apps.phone.apps.settings-ring-tone.label")}</div>
                    </div>

                    <div className="settings-middle">

                        <div className="settings-middle-ringtones">
                            {ringtones.map((_ringtone, i) => {
                                const selectedClass = (_ringtone.id === ringtone.id) ? "settings-middle-ringtone-current" : null
                                const playing = (this.state.audio.id === _ringtone.id && this.state.audio.playing) ? <i className="fas fa-pause" style={{ color: color_s }} /> : <i className="fas fa-play" style={{ color: color_s }} />
                                return (
                                    <div
                                        key={i}
                                        data-func="setSelected"
                                        data-ringtone={JSON.stringify(_ringtone)}
                                        className={`settings-middle-ringtone settings-ringtone-nav-element ${selectedClass}`}
                                        data-class="settings-middle-ringtone-selected"
                                        data-pos={[i + 1, 0]}
                                        style={{ background: color_s }}>
                                        <div className="settings-ringtone-label" style={{ color: color_t }}>{_ringtone.label}</div>
                                        <div className="settings-ringtone-btn">
                                            <div
                                                data-pos={[i + 1, 1]}
                                                data-func="playAudio"
                                                data-audio={JSON.stringify({ audio: _ringtone.ringtone, id: _ringtone.id })}
                                                data-class="settings-middle-ringtone-btn-selected"
                                                className="settings-ringtone-nav-element">
                                                {playing}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>
        )
    }


    focus = (element) => {
        window.localStorage.setItem("settings-ring-tone", JSON.stringify(element.pos))
    }
    exited = () => { }

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }

    playAudio = ({ audio }) => {
        const d = JSON.parse(audio)
        if (this.state.audio.id !== null) {
            if (d.id === this.state.audio.id) {
                if (this.state.audio.playing) {
                    this.state.audio.audio.pause()
                } else {
                    this.state.audio.audio.play()
                }
                this.setState({ audio: { id: this.state.audio.id, audio: this.state.audio.audio, playing: !this.state.audio.playing } })
            } else {
                this.state.audio.audio.pause()
                let a = new Audio(d.audio)
                a.play()
                this.setState({ audio: { id: d.id, audio: a, playing: true } })
            }
        } else {
            let a = new Audio(d.audio)
            a.play()
            this.setState({ audio: { id: d.id, audio: a, playing: true } })
        }
    }

    componentWillUnmount() {
        if (!this.state.audio.audio) return
        this.state.audio.audio.pause()
        this.setState({ audio: { id: null, audio: null, playing: null } })
    }

    setSelected = ({ ringtone }) => {
        const { UIXPhoneSetRingTone } = this.props
        UIXPhoneSetRingTone(JSON.parse(ringtone))
    }

    enter = ({ dataset }) => {
        if (!this[dataset.func]) return
        this[dataset.func](dataset)
    }

    backspace = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } = this.props
        UIXPhoneSetAnitmation("slide-2")
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetPath("settings-call")
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "settings-ring-tone") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    entered = () => {
        const { setKeyNav, UIXPhoneSetDarkBackground, settings } = this.props
        const elements = Array.from(document.getElementsByClassName("settings-ringtone-nav-element"))

        const navigation = new KeyNav(elements, (event, data) => this[event](data))
        const item = window.localStorage.getItem("settings-ring-tone")
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
    settings: phone.settings
})

const mapDispatchToProps = {
    UIXPhoneSetDarkBackground,
    UIXPhoneSetAnitmation,
    UIXPhoneSetAnimationDuration,
    UIXPhoneSetPath,
    UIXPhoneSetRingTone
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SettingsRingTone))
