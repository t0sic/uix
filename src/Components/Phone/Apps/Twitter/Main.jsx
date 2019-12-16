import { withTranslation } from "react-i18next"
import React, { Component } from "react"
import { connect } from "react-redux"
import Tweet from "./Tweet"
import "./twitter.css"

export class Main extends Component {
    render() {
        return (
            <div className="app twitter">
                <div className="twitter-main">
                    <div className="twitter-main-top">
                        <div className="twitter-main-top-profile-picture">
                            <div
                                style={{
                                    backgroundImage: `url(${"https://cdn.discordapp.com/attachments/638346400102481932/652921108659437571/noice.jpg"})`,
                                    backgroundSize: "cover"
                                }}
                            />
                        </div>
                        <div className="twitter-main-top-logo">
                            <i className="fab fa-twitter" />
                        </div>
                        <div className="twitter-main-top-tweet">
                            <div />
                        </div>
                    </div>

                    <div className="twitter-main-middle">
                        <div className="twitter-main-feed">
                            <Tweet
                                data={{
                                    author: {
                                        tag: "t__t",
                                        name: "Karim Tonfisk",
                                        profilePicture:
                                            "https://cdn.discordapp.com/attachments/638346400102481932/652921108659437571/noice.jpg"
                                    },
                                    tweet: {
                                        time: new Date(),
                                        comments: [],
                                        retweets: 0,
                                        likes: 0
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ phone }) => ({})

const mapDispatchToProps = {}

export default withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(Main)
)
