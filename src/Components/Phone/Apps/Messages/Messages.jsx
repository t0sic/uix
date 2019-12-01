import { UIXPhoneSetDarkBackground, UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation, UIXPhoneSetPath, UIXSetMessages } from "../../../../redux/actions/phoneActions";
import { numberFormater } from "../../Main/numberFormater";
import React, { Component } from "react";
import Keynav from "../../Main/KeyNav";
import { connect } from "react-redux";
import "./messages.css";

export class Messages extends Component {

    state = {focus: false}

    render() {

        const { conversation, textarea } = this.props.messages
        const { settings } = this.props
        const { darkMode } = settings
        const messages = this.messages()
        const person = this.person()
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"
        const color_s = darkMode ? "rgb(44, 44, 46)" : "rgb(229, 229, 234)"
        const color_t = darkMode ? "white" : "black"

        return (
            <div className="app">
                <div className="messages" style={{background: color_p}}>

                    <div className="messages-top" style={{background: color_s}}>
                        <div 
                            data-pos={[0, 0]} 
                            data-func="quit"
                            data-class="messages-top-chevron-selected"
                            className="messages-top-chevron messages-navigation-element" 
                        >
                            <i className="fas fa-chevron-left" style={{ color: color_t }} />
                        </div>
                        <div className="messages-top-contact-info">
                            <div className="messages-top-contact-image">{person.label ? person.label[0] : <i className="fas fa-user" />}</div>
                            <div className="messages-top-contact-label" style={{ color: color_t }}>{person.label ? person.label : numberFormater(person.number)}</div>
                        </div>
                    </div>

                    <div className="messages-middle">
                        {messages}
                    </div>

                    <div className="messages-footer">
                        <textarea 
                            style={{background: color_s, color: color_t}} 
                            onFocus={() => this.setState({focus: true})} 
                            onBlur={() => this.setState({focus: false})} 
                            className="messages-navigation-element"
                            data-pos={[conversation.length + 1, 0]}
                            onChange={this.handleChange}
                            placeholder="iMessage"
                            spellCheck={false}
                            value={textarea}
                        />
                        <div 
                            className="messages-footer-add-image messages-navigation-element"
                            data-class="messages-top-chevron-selected"
                            data-pos={[conversation.length + 1, 1]}
                        >
                            <i className="fas fa-camera" style={{ color: "rgb(142, 142, 147)", fontSize: "120%" }} />
                        </div>
                    </div>

                </div>  
            </div>
        )
    }

    messages = () => {
        const { messages, settings } = this.props
        const { conversation } = messages
        const { darkMode } = settings
        let output = []

        conversation.forEach((message, i) => {
            const color_t_i = darkMode ? "white" : "black"
            const background = darkMode ? "rgb(58, 58, 60)" : "rgb(209, 209, 214)"
            const { text, recived } = message

            output.push(
                <div 
                    key={i} 
                    data-pos={[i + 1, 0]}
                    data-class="message-container-selected"
                    className="messsage-container messages-navigation-element"
                >
                    <div 
                        className={`messsage-content ${recived ? "message-recived" : "message-sent"}`} 
                        style={{background, color: recived ? color_t_i : ""}}
                    >
                        {text}
                    </div>
                </div>
            )
        })

        return output
    }

    handleChange = ({target}) => {
        const { UIXSetMessages } = this.props
        let messages = this.props.messages
        messages.textarea = target.value
        UIXSetMessages(messages)
    }

    person = () => {
        const { contacts, messages } = this.props
        let person = null
        contacts.forEach(contact => {if (contact.id === messages.id) person = contact})

        if (!person) person = { number: messages.id }

        return person
    }

    quit = () => {
        const { messages, UIXPhoneSetAnimationDuration, UIXPhoneSetAnitmation, UIXPhoneSetPath } = this.props
        const app = messages.quit || "home"
        UIXPhoneSetAnimationDuration(300)
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetPath(app)
    }

    navigation = () => {
        const { setKeyNav, messages } = this.props
        const { conversation } = messages
        const elements = Array.from(document.getElementsByClassName("messages-navigation-element"))
        const navigation = new Keynav(elements, (event, data) => {if (this[event]) this[event](data) })
        navigation.position.vertical = conversation.length
        navigation.handleSelected()
        setKeyNav(navigation)
    }

    backspace = () => { if(!this.state.focus) this.quit()}

    focus = element => { if(!Array.from(element.classList).includes("messages-footer-add-image")) element.scrollIntoViewIfNeeded() }
    enter = ({ dataset }) => { if (dataset.func && this[dataset.func]) this[dataset.func]()}

    componentDidMount() { window.addEventListener("phone", this.handleEvent) }
    handleEvent = ({ detail }) => { if (detail.app === "messages" && this[detail.action]) this[detail.action]() }
    entered = () => {
        const { UIXPhoneSetDarkBackground, settings } = this.props
        UIXPhoneSetDarkBackground(settings.darkMode)

        this.navigation()
    }

}

const mapStateToProps = ({phone}) => ({
    settings: phone.settings,
    messages: phone.apps.messages,
    contacts: phone.apps.contacts
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration, 
    UIXPhoneSetDarkBackground, 
    UIXPhoneSetAnitmation, 
    UIXPhoneSetPath,
    UIXSetMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
