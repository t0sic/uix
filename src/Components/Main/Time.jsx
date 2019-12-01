import { Component } from "react";
import { connect } from "react-redux";
import { UIXSetWorld } from "../../redux/actions/actions.js";

export class Time extends Component {
    render() {
        return null
    }

    componentDidMount() {
        this.setTime()
        setInterval(() => {
            this.setTime()            
        }, 1000 * 60)
    }

    setTime = () => {
        const { UIXSetWorld } = this.props
        const time = new Date()
        const minutes = (time.getMinutes() > 9) ? time.getMinutes() : "0" + time.getMinutes()
        const hours = (time.getHours() > 9) ? time.getHours() : "0" + time.getHours()
        let str = hours + ":" + minutes   
        UIXSetWorld({time: str})                
    }

}

export default connect(() => ({}), {UIXSetWorld})(Time)
