import React, { Component } from "react"
import "./twitter.css"

class Tweet extends Component {
    state = {
        height: "0px"
    }

    render() {
        return (
            <div className="twitter-tweet">
                <div className="twitter-tweet-left">
                    <div className="twitter-tweet-image" />
                </div>
                <div
                    className="twitter-tweet-right"
                    ref={element => (this.tweet = element)}
                >
                    <div className="twitter-tweet-profile-info">
                        <span className="twitter-tweet-profile-label">
                            Karim Tonfisk
                        </span>
                        <span className="twitter-tweet-profile-tag">@t__t</span>
                        <div className="twitter-tweet-info-divider">.</div>
                        <span className="twitter-tweet-time">18h</span>
                    </div>
                    <div className="twitter-tweet-content">
                        <span className="twitter-tweet-content-text">
                            Yoo guys how are you doing im doing just fine today!
                        </span>
                        <div className="twitter-tweet-content-image" />
                    </div>
                    <div className="twitter-tweet-actions">
                        <i className="far fa-comment">
                            <span>10</span>
                        </i>
                        <i className="fas fa-retweet" />
                        <i className="far fa-heart" />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({ height: this.tweet.clientHeight - 50 })
    }
}

export default Tweet
