import React from 'react';

import { AddChannel } from '../assets';

const ActiveChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing,  }) => {
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
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
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

export default ActiveChannelList
