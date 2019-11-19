import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { UIXInventorySet, UIXChangeLocation } from "../../redux/actions/actions";
import Container from "./Container";
import "./inventory.css";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.css";

export class Inventory extends Component {
    state = {
        current: {
            leftContainer: "inventory",
            rightContainer: "ground"
        },
        check: false,
    }

    render() {

        const { t } = this.props

        return (
            <div className="inventory">
                <div className="inventory-inner">
                    <div className="inventory-container">
                        <div className="inventory-container-bar">
                            {this.inventoryBars("leftContainer")}
                        </div>
                        <div className="inventory-container-weight">
                            {this.inventoryContainer("leftContainer").maxWeight ?
                                <span>
                                    {this.getWeight("leftContainer")}/<span>{this.inventoryContainer("leftContainer").maxWeight}</span>
                                </span> : null
                            }
                        </div>
                        <Container onDrop={this.handleDrop} container={this.inventoryContainer("leftContainer")} />
                    </div>

                    <div className="inventory-actions">
                        <input onFocus={() => this.isFocused = true} onBlur={() => this.isFocused = false} type="number" value={this.state.input} onChange={({ target }) => this.setState({ input: target.value })} placeholder={t("apps.inventory.inputPlaceholder")} />
                        <button className="inventory-use-btn">{t("apps.inventory.useBtn")}</button>
                        <button className="inventory-give-btn">{t("apps.inventory.giveBtn")}</button>
                    </div>

                    <div className="inventory-container">
                        <div className="inventory-container-bar">
                            {this.inventoryBars("rightContainer")}
                        </div>
                        <div className="inventory-container-weight">
                            {this.inventoryContainer("rightContainer").maxWeight ?
                                <span>
                                    {this.getWeight("rightContainer")}/<span>{this.inventoryContainer("rightContainer").maxWeight}</span>
                                </span> : null
                            }
                        </div>
                        <Container onDrop={this.handleDrop} container={this.inventoryContainer("rightContainer")} />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        $(".inventory-use-btn").droppable({
            accept: ".inventory-item",

            drop: function (event, ui) {
                if ($(ui.draggable).data("item").item.usable) {
                    // console.log($(ui.draggable).data("item").item)
                }
            }
        })

        $(".inventory-give-btn").droppable({
            accept: ".inventory-item",

            drop: function (event, ui) {
                // console.log($(ui.draggable).data("item").item)
            }
        })

        window.emit("UIX_SET_NUIFOCUS", { cursor: true, focus: true })
        window.emit("UIX_SET_BLUR", true)
        window.addEventListener("keyup", this.handleKeyup)

    }

    componentWillUnmount() {
        window.emit("UIX_SET_BLUR", false)
        window.emit("UIX_SET_NUIFOCUS", { cursor: false, focus: false })
    }

    handleKeyup = ({ keyCode }) => {
        if ((keyCode === 8 || keyCode === 27) && !this.isFocused) this.props.UIXChangeLocation("")
    }

    getWeight = (container) => {
        let array = this.inventoryContainer(container).items
        let totalWeight = 0
        for (let i = 0; i < array.length; i++) {
            const item = array[i]

            totalWeight += item.weight * item.count
        }
        return Math.round(totalWeight * 100) / 100
    }

    handleDrop = ({ item, slot, action }) => {
        if (!this.state.check && slot.slot !== item.slot) {
            let inventory = this.props.player.character.inventory

            if (Number(this.state.input)) {
                if (item.count > Number(this.state.input) && Number(this.state.input) > 0) {
                    item.count = Number(this.state.input)
                }
            }

            window.emit("UIX_INVENTORY_MOVE_ITEM", {
                to: slot,
                from: { slot: item.slot, action },
                item
            })

            const copy = JSON.parse(JSON.stringify({ item, slot, action }))
            for (let i = 0; i < inventory.leftContainer.length; i++) {
                if (inventory.leftContainer[i].action === slot.action) {
                    item.slot = slot.slot
                    inventory.leftContainer[i].items.push(item)
                }
            }

            for (let i = 0; i < inventory.rightContainer.length; i++) {
                if (inventory.rightContainer[i].action === slot.action) {
                    item.slot = slot.slot
                    inventory.rightContainer[i].items.push(item)
                }
            }

            this.delete(copy.item, copy.action)

            this.props.UIXInventorySet(inventory)
            this.forceUpdate()
            this.setState({ check: false })
        }
        this.setState({ check: true }, () => {
            setTimeout(() => {
                this.setState({ check: false })
            }, 1)
        })
    }

    delete = (item, action) => {
        let inventory = this.props.player.character.inventory

        for (let i = 0; i < inventory.leftContainer.length; i++) {
            if (inventory.leftContainer[i].action === action) {
                inventory.leftContainer[i].items = inventory.leftContainer[i].items.filter(c => c.slot !== item.slot)
            }
        }

        for (let i = 0; i < inventory.rightContainer.length; i++) {
            if (inventory.rightContainer[i].action === action) {
                inventory.rightContainer[i].items = inventory.rightContainer[i].items.filter(c => c.slot !== item.slot)
            }
        }

        this.props.UIXInventorySet(inventory)
    }

    inventoryContainer = (container) => {
        let _container = null
        const inventory = this.props.player.character.inventory

        inventory[container].forEach((element) => {
            if (element.action === this.state.current[container]) {
                _container = element
            }
        })

        return _container
    }

    inventoryBars = (container) => {
        let output = []
        const inventory = this.props.player.character.inventory

        inventory[container].forEach((element, i) => {
            if (element.action === this.state.current[container]) {
                inventory[container].push(inventory[container][i])
                inventory[container].splice(i, 1)
            }
        })

        inventory[container].reverse().forEach(({ action, label }, i) => {
            output.push(<div onClick={() => {
                let current = this.state.current
                current[container] = action
                this.setState({ current })
            }} key={i}>{label}</div>)
        })

        return output
    }

}

const mapStateToProps = ({ top }) => ({
    player: top.player
})

const mapDispatchToProps = {
    UIXInventorySet,
    UIXChangeLocation
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Inventory));
