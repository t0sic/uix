import React, { Component } from "react";
import { connect } from "react-redux";
import "./hud.css";

export class Hud extends Component {
    render() {

        const { player, world } = this.props
        const { time } = world
        const { equipedWeapon } = player.character

        return (
            <div className="hud">
                <div className="hud-bar">
                    <div className="hud-time">{time}</div>
                    <div className="hud-weapon">
                        <div className={`hud-wp-image hud-${equipedWeapon.name}`} />
                        <div className="hud-wp-ammo">
                            <span>{equipedWeapon.ammo.mag}</span>|<span>{equipedWeapon.ammo.loaded}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ top }) => ({
    player: top.player,
    world: top.world
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Hud)
