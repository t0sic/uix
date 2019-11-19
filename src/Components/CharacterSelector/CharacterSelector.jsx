import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import CharacterBox from "./CharacterBox";
import { connect } from "react-redux";
import { config } from "../../config";
import "./characterSelector.css";

export class CharacterSelector extends Component {

    state = {
        path: "charSelector",
        inputs: {
            name: "",
            lastname: "",
            birthdate: "",
            l: "",
            gender: ""
        },
        validated: false,
        close: false,
        positionChosen: false,
        selectedChar: null
    }

    render() {

        const path = this.state.path
        const boxes = this.boxes()
        const positions = this.positions()
        const characterInnerClasses = this.state.close ? "character-selector-inner-close" : null
        const { name, lastname, birthdate, l, gender } = this.state
        const { t } = this.props
        const characterSelectionVisible = (path === "charSelector") ? true : false
        const characterCreatorVisible = (path === "charCreator") ? true : false
        const characterChoosePositionVisible = (path === "charChoosePosition") ? true : false

        return (
            <div className="character-selector">
                <div className={`character-selector-inner ${characterInnerClasses}`}>

                    <CSSTransition
                        timeout={500}
                        classNames="character-selection-animation"
                        appear={true}
                        leave={toString(!characterChoosePositionVisible)}
                        in={characterChoosePositionVisible}
                        unmountOnExit
                    >
                        <div className="character-selector-choose-position">
                            <button className="ghfgsjhfvdsg" onClick={() => this.setState({ path: "charSelector" })} style={{ position: "absolute", marginLeft: "-45%", marginTop: "-24%" }}>{t("apps.character-selector.position.return")}</button>
                            <div className="character-choose-position-box">
                                <div style={{ textAlign: "center", fontSize: "145%" }}>{t("apps.character-selector.position.choose-position")}</div>
                                <div className="charactr-chose-positon-positions">
                                    {positions}
                                </div>
                                {this.state.positionChosen ?
                                    <CSSTransition
                                        timeout={500}
                                        classNames="character-selection-animation"
                                        appear={true}
                                        leave={toString(!this.state.positionChosen)}
                                        in={this.state.positionChosen}
                                        unmountOnExit
                                    >
                                        <div className="character-selector-choose-position-container">
                                            <button onClick={() => this.play()} className="character-selector-choose-position-btn">{t("apps.character-selector.position.play")}</button>
                                        </div>
                                    </CSSTransition>
                                    : null}
                            </div>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        timeout={500}
                        classNames="character-selection-animation"
                        appear={true}
                        leave={toString(!characterCreatorVisible)}
                        in={characterCreatorVisible}
                        unmountOnExit
                    >
                        <div className="character-selector-create">
                            <button onClick={() => this.setState({ path: "charSelector" })} style={{ position: "absolute", marginLeft: "-45%", marginTop: "-24%" }}>{t("apps.character-selector.create.back")}</button>
                            <div className="character-selector-inputs">
                                <div className="character-creator-header">{t("apps.character-selector.create.create-character")}</div>
                                <form onChange={(e) => this.handleFormChange(e.target)}>
                                    <label>{t("apps.character-selector.create.firstname")}</label>
                                    <input value={name} name="name" placeholder="David" />
                                    <label>{t("apps.character-selector.create.lastname")}</label>
                                    <input value={lastname} name="lastname" placeholder="Topplock" />
                                    <label>{t("apps.character-selector.create.birthdate")}</label>
                                    <input value={birthdate} name="birthdate" placeholder="1994-01-21" />
                                    <label>{t("apps.character-selector.create.length")}</label>
                                    <input type="number" value={l} name="l" placeholder="191" />
                                    <label>{t("apps.character-selector.create.gender")}</label>
                                    <input value={gender} name="gender" placeholder="M" />
                                </form>
                                <div className="character-creator-btn">
                                    <button onClick={this.handleClose} className={this.state.validated ? null : "btn-disabled"} >{t("apps.character-selector.create.create-btn")}</button>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        timeout={500}
                        classNames="character-selection-animation"
                        appear={true}
                        leave={toString(!characterSelectionVisible)}
                        in={characterSelectionVisible}
                        unmountOnExit
                    >
                        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                            <div className="header glitch gl-4">
                                <p data-text="Glitched Roleplay">Glitched Roleplay</p>
                            </div>
                            <div className="character-selector-boxes">
                                {boxes}
                            </div>
                        </div>
                    </CSSTransition>




                </div>
            </div>
        )
    }

    componentDidMount() {
        window.emit("UIX_SET_NUIFOCUS", { cursor: true, focus: true })
    }

    componentWillUnmount() {
        window.emit("UIX_SET_NUIFOCUS", { cursor: false, focus: false })
    }

    play = () => {
        const character = this.state.selectedChar
        const pos = this.state.positionChosen
        window.emit("UIX_PLAY_CHARACTER", { character, pos })
        this.setState({ close: true })
    }

    positions = () => {
        let output = []
        const positions = config.characterSelectorPositions

        positions.forEach(({ action, label }, i) => {
            const selectedClass = (action === this.state.positionChosen) ? "character-choose-position-position-selected" : null
            output.push(<div onClick={() => this.setState({ positionChosen: action })} className={`character-choose-position-position ${selectedClass}`} key={i}>{label}</div>)
        })

        return output
    }

    handleClose = () => {
        if (!this.state.validated) return

        window.emit("UIX_CREATE_CHARACTER", this.state.inputs)
        this.setState({ close: true })
    }

    onDelete = (character) => {

        window.emit("UIX_DELETE_CHARACTER", character)

    }

    handleFormChange = (target) => {

        let inputs = this.state.inputs
        inputs[target.name] = target.value
        this.setState({ inputs }, () => {
            let config = [0, 1, 2, 3, 5, 6, 8, 9]

            const validate = () => {
                let validated = true

                let dob = this.state.inputs.birthdate

                if (dob.length > 10) {
                    validated = false
                }


                if (dob[4]) {
                    if (dob[4] !== "-") {
                        validated = false
                    }
                } else {
                    validated = false
                }


                if (dob[7]) {
                    if (dob[7] !== "-") {
                        validated = false
                    }
                } else {
                    validated = false
                }


                if (dob.length !== 10) {
                    validated = false
                }


                config.forEach((elem, i) => {
                    if (dob[elem]) {
                        if (isNaN(dob[elem])) {
                            validated = false
                        }
                    }
                })

                if (this.state.inputs.l < 140) {
                    validated = false
                }

                if (this.state.inputs.l > 230) {
                    validated = false
                }


                if (this.state.inputs.name.length <= 0) {
                    validated = false
                }

                if (this.state.inputs.lastname.length <= 0) {
                    validated = false
                }


                if (this.state.inputs.gender.length !== 1) {
                    validated = false
                }

                this.setState({ validated })
            }

            validate()

        })

    }

    boxes = () => {
        let output = []
        const { t } = this.props

        for (let i = 0; i < this.props.characters.length; i++) {
            output.push(
                <CharacterBox
                    onCharacterChosen={
                        () => {
                            this.setState({ selectedChar: this.props.characters[i] })
                            this.setState({ path: "charChoosePosition" })
                        }
                    }
                    i={i}
                    key={i}
                    character={this.props.characters[i]}
                    onCharacterDelete={() => this.onDelete(this.props.characters[i])}
                />
            )
        }

        let length = 4 - output.length

        for (let i = 0; i < length; i++) {
            output.push(
                <div key={i + 20} className="character-box">
                    <h2>0{output.length + 1}</h2>
                    <div className="character-box-info">
                        <div className="character-box-name">{t("apps.character-selector.empty.header")}</div>
                    </div>
                    <div className="character-box-new-btns">
                        <button onClick={() => this.setState({ path: "charCreator" })} >{t("apps.character-selector.empty.btn")}</button>
                    </div>
                </div>
            )
        }

        return output
    }

}


const mapStateToProps = ({ top }) => ({
    characters: top.player.characters
})

const mapDispatchToProps = {

}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(CharacterSelector))
