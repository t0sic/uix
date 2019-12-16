import React, { Component } from "react"
import Item from "./Item"
import $ from "jquery"
import "jquery-ui-bundle"
import "jquery-ui-bundle/jquery-ui.css"

class Container extends Component {
    render() {
        const slots = this.slots()

        return <div className="inventory-container-inner">{slots}</div>
    }

    componentDidMount() {
        this.droppable()
    }

    componentDidUpdate() {
        this.droppable()
    }

    droppable = () => {
        const container = this

        $(".inventory-container-slot").droppable({
            accept: ".inventory-item",

            drop: function(event, ui) {
                if (this.children.length) {
                    const item1 = $(ui.draggable).data("item").item
                    const item2 = JSON.parse(this.children[0].dataset.item).item
                    const slot1 = JSON.parse(this.dataset.slot)
                    const slot2 = {
                        slot: $(ui.draggable).data("item").item.slot,
                        action: $(ui.draggable).data("item").action
                    }
                    const action1 = $(ui.draggable).data("item").action
                    const action2 = JSON.parse(this.children[0].dataset.item)
                        .action
                    container.props.onSwitch(
                        { item: item2, slot: slot2, action: action2 },
                        { item: item1, slot: slot1, action: action1 }
                    )
                } else {
                    const item = $(ui.draggable).data("item").item
                    const action = $(ui.draggable).data("item").action
                    const slot = JSON.parse(this.dataset.slot)
                    container.props.onDrop({ item, slot, action })
                }
            }
        })
    }

    slots = () => {
        let output = []
        const {
            container,
            onItemHover,
            onMouseMove,
            onItemLeaveHover
        } = this.props
        const { slots, items, action } = container

        for (let i = 0; i < slots; i++) {
            let item = null
            for (let j = 0; j < items.length; j++) {
                if (items[j].slot === i) {
                    item = (
                        <Item
                            onItemHover={onItemHover}
                            onMouseMove={onMouseMove}
                            onItemLeaveHover={onItemLeaveHover}
                            action={action}
                            item={items[j]}
                        />
                    )
                }
            }
            output.push(
                <div
                    className="inventory-container-slot"
                    key={i}
                    data-slot={JSON.stringify({ slot: i, action })}
                >
                    {item}
                </div>
            )
        }

        return output
    }
}

export default Container
