import React from 'react';
import {  useChatContext } from 'stream-chat-react';


const QueueList = ({  children, error = false, loading, type, queueChannelCount }) => {
    const { channel } = useChatContext();
    if(error) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    if(loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    Queue loading...
                </p>
            </div>
        )
    }

    
    

    return (
        <div>
            {children}
        </div>
    )
}

export default QueueList
