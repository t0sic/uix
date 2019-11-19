import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { withTranslation } from "react-i18next";
import "./characterSelector.css";

class CharacterBox extends Component {
    render() {
        const { i, character, t } = this.props
        const { name, id, jobb, rank, number, cash, bank } = character

        return (
            <div className="character-box">
                <h2>0{i + 1}</h2>
                <div className="character-box-info">
                    <div className="character-box-name">{name}</div>
                    <div className="character-box-data">
                        <span className="character-box-data-label">{t("apps.character-selector.id")}: </span>
                        <span className="character-box-data-content">{id}</span>
                    </div>
                    <div className="character-box-data">
                        <span className="character-box-data-label">{t("apps.character-selector.jobb")}: </span>
                        <span className="character-box-data-content">{jobb} - {rank}</span>
                    </div>
                    <div className="character-box-data">
                        <span className="character-box-data-label">{t("apps.character-selector.number")}: </span>
                        <span className="character-box-data-content">{number}</span>
                    </div>
                    <div className="character-box-data">
                        <span className="character-box-data-label">{t("apps.character-selector.cash")}: </span>
                        <span className="character-box-data-content"><CurrencyFormat value={cash} displayType="text" thousandSeparator={true} /> kr</span>
                    </div>
                    <div className="character-box-data">
                        <span className="character-box-data-label">{t("apps.character-selector.bank")}: </span>
                        <span className="character-box-data-content"><CurrencyFormat value={bank} displayType="text" thousandSeparator={true} /> kr</span>
                    </div>
                </div>
                <div className="character-box-btns">
                    <button onClick={() => this.props.onCharacterChosen()}>{t("apps.character-selector.play")}</button>
                    <button onClick={() => this.props.onCharacterDelete()}>{t("apps.character-selector.remove")}</button>
                </div>
            </div>
        );
    }
}

export default withTranslation()(CharacterBox);