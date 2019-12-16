import "draft-js-hashtag-plugin/lib/plugin.css"
import "draft-js-mention-plugin/lib/plugin.css"
import createHashtagPlugin from "draft-js-hashtag-plugin"
import createMentionPlugin, {
    defaultSuggestionsFilter
} from "draft-js-mention-plugin"
import styles from "./theme.module.css"
import Editor from "draft-js-plugins-editor"
import React, { Component } from "react"
import { EditorState } from "draft-js"
import { connect } from "react-redux"
import "./twitter.css"

const mentions = [
    {
        name: "Karim Tonfisk",
        tag: "t__t",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    },
    {
        name: "Long John",
        tag: "whore_slayer69",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    },
    {
        name: "Karim Tonfisk",
        tag: "t__t",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    },
    {
        name: "Karim Tonfisk",
        tag: "t__t",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    },
    {
        name: "Karim Tonfisk",
        tag: "t__t",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    },
    {
        name: "Karim Tonfisk",
        tag: "t__t",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
    }
]

const positionSuggestions = ({ state, props }) => {
    let transform
    let transition

    if (state.isActive && props.suggestions.length > 0) {
        transform = "scaleY(1)"
        transition = "all 0.25s cubic-bezier(.3,1.2,.2,1)"
    } else if (state.isActive) {
        transform = "scaleY(0)"
        transition = "all 0.25s cubic-bezier(.3,1,.2,1)"
    }

    return {
        transform,
        transition
    }
}

const Entry = props => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        isFocused, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props

    return (
        <div {...parentProps}>
            <div className={theme.mentionSuggestionsEntryContainer}>
                <div className={theme.mentionSuggestionsEntryContainerLeft}>
                    <img
                        src={mention.avatar}
                        className={theme.mentionSuggestionsEntryAvatar}
                        role="presentation"
                        alt=""
                    />
                </div>

                <div className={theme.mentionSuggestionsEntryContainerRight}>
                    <div className={theme.mentionSuggestionsEntryText}>
                        {mention.name}
                    </div>
                    <div className={theme.mentionTag}>@{mention.tag}</div>
                </div>
            </div>
        </div>
    )
}

export class Compose extends Component {
    constructor(props) {
        super(props)
        this.mentionPlugin = createMentionPlugin({
            mentions,
            theme: styles,
            entityMutability: "IMMUTABLE",
            positionSuggestions,
            mentionPrefix: "@",
            supportWhitespace: true
        })
        this.hashtagPlugin = createHashtagPlugin({ theme: styles })
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: []
        }
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin
        const { editorState, suggestions } = this.state
        const plugins = [this.mentionPlugin, this.hashtagPlugin]

        return (
            <div className="app twitter">
                <div className="twitter-compose">
                    <div className="twitter-compose-top">
                        <div className="twitter-compose-cancel">Cancel</div>
                        <div className="twitter-compose-btn">Tweet</div>
                    </div>
                    <div className="twitter-compose-middle">
                        <div className="twitter-compose-editor-container">
                            <div className="twitter-compose-editor-container-column-left">
                                <div className="twitter-compose-editor-container-profile-picture" />
                            </div>
                            <div className="twitter-compose-editor-container-column-right">
                                <div
                                    className="twitter-compose-editor editor"
                                    onClick={this.onFocus}
                                >
                                    <Editor
                                        ref={element => {
                                            this.editor = element
                                        }}
                                        placeholder="What's going on?"
                                        editorState={editorState}
                                        onChange={this.onChange}
                                        plugins={plugins}
                                    />
                                </div>
                            </div>
                            <MentionSuggestions
                                onSearchChange={this.onSearchChange}
                                onAddMention={this.onAddMention}
                                suggestions={suggestions}
                                entryComponent={Entry}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions)
        })
    }

    onAddMention = () => {}
    onFocus = () => this.editor.focus()
    onChange = editorState => this.setState({ editorState })
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Compose)
