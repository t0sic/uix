import React, { Component, Fragment } from "react";
import CurrencyFormat from "react-currency-format";
import { withTranslation } from "react-i18next";
import Calendar from "react-calendar";
import { connect } from "react-redux";
import "./bank.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentAccount: "4938 4893 2103 1002",
            date: new Date()
        }
    }

    render() {

        const creditCard = this.creditCard()
        const pillars = this.pillars()
        const pillarValues = this.pillarValues()
        const { player, t, bank } = this.props
        const { character } = player
        const { currentAccount } = this.state

        return (
            <Fragment>
                <div className="bank-welcoming-text">{t("apps.bank.welcome")}, <span> {character.lastname}!</span></div>
                <div className="bank-data">

                    <div className="bank-account-box d">
                        <div className="bank-account-box-top">{t("apps.bank.bank-account-boxes.exchange-rates.label")}</div>
                        <div className="bank-exchange-rates">
                            <div><i className="fas fa-exclamation-triangle"></i></div>
                            <div>{t("apps.bank.bank-account-boxes.exchange-rates.maintance")}</div>
                        </div>
                    </div>

                    <div className="bank-account-box c">
                        <div className="bank-account-box-top">{t("apps.bank.bank-account-boxes.calendar.label")}</div>
                        <div className="bank-account-calendar">
                            <div className="bank-account-calendar-inner">
                                <Calendar
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bank-account-box f">
                        <div className="bank-account-box-top">{t("apps.bank.bank-account-boxes.recent-transactions.label")}</div>
                        <div className="bank-account-recent-transactions">
                            {creditCard.recentTransactions.map(({ value, label, date }, i) => {
                                const className = (value > 0) ? "positive" : "negative"
                                const month = ((date.getMonth() + 1).toString().length === 1) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
                                const day = (date.getDate().toString().length === 1) ? "0" + date.getDate() : date.getDate()
                                const time = `${month}/${day}/${date.getYear() + 1900}`
                                const prefix = (value > 0) ? "+" : ""
                                const icon = (value > 0) ? "up" : "down"

                                return (
                                    <div key={i} className="recent-transaction">
                                        <div className="recent-transaction-icon">
                                            <i className={`fas fa-long-arrow-alt-${icon} ${className}`} />
                                        </div>
                                        <div className="recent-transaction-info">
                                            <div className="recent-transaction-info-label">{label}</div>
                                            <div className="recent-transaction-info-date">{time}</div>
                                        </div>
                                        <div className={`recent-transaction-money ${className}`}>{prefix}<CurrencyFormat value={value} displayType="text" thousandSeparator={true} prefix="$" /></div>
                                    </div>
                                )
                            }
                            )}

                        </div>
                    </div>

                    <div className="bank-account-box a">
                        <div className="bank-account-box-top">{t("apps.bank.bank-account-boxes.accounts.label")}</div>
                        <div className="bank-account-box-middle">
                            <div className="bank-account-box-middle-left">
                                <div className="bank-account-box-account-middle-label">{t("apps.bank.bank-account-boxes.accounts.account-holder")}</div>
                                <div className="bank-account-box-account-middle-data">{character.name} {character.lastname}</div>
                                <div className="bank-account-box-account-middle-label">{t("apps.bank.bank-account-boxes.accounts.your-balance")}</div>
                                <div className="bank-account-box-account-middle-data" style={{ fontSize: "190%", letterSpacing: "0.4px" }}>
                                    <CurrencyFormat value={creditCard.balance} displayType="text" thousandSeparator={true} prefix="$" />
                                </div>
                                <div className="bank-account-box-account-middle-label">{t("apps.bank.bank-account-boxes.accounts.account-number")}</div>
                                <div className="bank-account-box-account-middle-data">{creditCard.accountNumber}</div>
                            </div>
                            <div className="bank-account-box-middle-right">
                                <div className="bank-account-box-middle-right-top">
                                    <div className="bank-account-box-account-middle-label" style={{ width: "25%", marginLeft: 0 }}>{t("apps.bank.bank-account-boxes.accounts.credit-cards")}</div>
                                    <div className="bank-account-box-account-card-dropdown">
                                        <select value={currentAccount} onChange={this.handleChange}>
                                            {bank.accounts.map((option, i) => <option value={option.accountNumber} key={i}>{option.accountNumber}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="bank-account-credit-card">
                                    <div className="bank-accound-credit-card-inner">
                                        <div className="bank-account-credit-card-bank-name">Swe Bank</div>
                                        <div className="bank-account-creidt-card-bank-date">08/23</div>
                                        <div className="bank-account-credit-card-bank-balance">
                                            <CurrencyFormat value={creditCard.balance} displayType="text" thousandSeparator={true} prefix="$" />
                                        </div>
                                        <div className="bank-account-credit-card-card-holder-name">{character.name} {character.lastname}</div>
                                        <div className="bank-account-credit-card-number">{creditCard.accountNumber}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bank-account-box e">
                        <div className="bank-account-box-top">{t("apps.bank.bank-account-boxes.balance-statement.label")}</div>
                        <div className="bank-balance-statement-main">
                            <div className="bank-balance-statement-inner">
                                <div className="bank-balance-statement-money">
                                    {pillarValues}
                                </div>
                                <div className="bank-balance-statement-pillars">
                                    {pillars}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }


    onChange = date => this.setState({ date })

    handleChange = (e) => {
        this.setState({ currentAccount: e.target.value })
    }

    pillarValues = () => {
        const account = this.creditCard()
        const output = []
        let values = []

        account.data.forEach(({ moneyMade }) => {
            values.push(moneyMade)
        })

        values.sort(function (a, b) { return b - a });

        output.push(<div key={1}><CurrencyFormat value={Math.round(Math.max(...values))} displayType="text" thousandSeparator={true} prefix="$" /></div>)
        output.push(<div key={2}><CurrencyFormat value={Math.round((Math.max(...values) / 2) * 1.5)} displayType="text" thousandSeparator={true} prefix="$" /></div>)
        output.push(<div key={3}><CurrencyFormat value={Math.round(Math.max(...values) / 2)} displayType="text" thousandSeparator={true} prefix="$" /></div>)
        output.push(<div key={4}><CurrencyFormat value={Math.round((Math.max(...values) / 4) * 1.5)} displayType="text" thousandSeparator={true} prefix="$" /></div>)
        output.push(<div key={5}><CurrencyFormat value={Math.round((Math.max(...values) / 4))} displayType="text" thousandSeparator={true} prefix="$" /></div>)
        output.push(<div key={6}><CurrencyFormat value={Math.round((Math.max(...values) / 8))} displayType="text" thousandSeparator={true} prefix="$" /></div>)
        output.push(<div key={7}>$0</div>)

        return output
    }

    pillars = () => {
        const account = this.creditCard()
        const output = []
        let max = null
        let values = []

        account.data.forEach(({ moneyMade }) => {
            values.push(moneyMade)
        })

        max = Math.max(...values)

        account.data.forEach(({ month, moneyMade }, key) => {
            output.push(
                <div key={key} className="bank-balance-statement-pillar">
                    <div className="bank-pillar">
                        <div style={{ height: (moneyMade / max) * 100 + "%" }}></div>
                    </div>
                    <div className="bank-pillar-label">{month}</div>
                </div>
            )
        })

        return output
    }

    creditCard = () => {
        const accounts = this.props.bank.accounts
        const current = this.state.currentAccount
        let account = null

        accounts.forEach(elem => {
            if (elem.accountNumber === current) { account = elem }
        })

        return account
    }

}

const mapStateToProps = ({ top }) => ({
    player: top.player,
    bank: top.apps.bank
})


const mapDispatchToProps = {

}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));