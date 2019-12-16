import React, { Component } from "react"
import $ from "jquery"
import "jquery-ui-bundle"
import "jquery-ui-bundle/jquery-ui.css"

class Item extends Component {
    render() {
        const {
            item,
            action,
            onItemHover,
            onMouseMove,
            onItemLeaveHover
        } = this.props

        return (
            <div
                onMouseEnter={() => onItemHover(item)}
                onMouseLeave={onItemLeaveHover}
                onMouseMove={onMouseMove}
                className="inventory-item"
                data-item={JSON.stringify({ item, action })}
            >
                <div className="inventory-item-image" />
                <div className="inventory-item-info">
                    <span>{item.count}x</span>
                    <span>{item.weight}</span>
                </div>
            </div>
        )
    }

    componentDidMount() {
        $(".inventory-item").draggable({
            revert: true,
            revertDuration: 0,
            scroll: false,
            helper: "clone",
            appendTo: $(".inventory"),

            start: function(event, ui) {
                $(this).hide()
            },

            stop: function(event, ui) {
                $(this).show()
            }
        })
    }
}

export default Item
