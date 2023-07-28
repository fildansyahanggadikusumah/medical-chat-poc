
// import React,{ useState, useEffect } from 'react';
// import { Avatar, useChatContext } from 'stream-chat-react';

// const ChannelQueue = ({ queuedChannels }) => {
//     const { setActiveChannel } = useChatContext();

//     const handleClick = (channel) => {
//         setActiveChannel(channel);
//     }

//     return (
//         <div className="channel-queue__container">
//             <p>Queue</p>
//             {queuedChannels.map(channel => (
//                 <div key={channel.cid} onClick={() => handleClick(channel)}>
//                     <p>{channel.data.name}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ChannelQueue

import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';

import { QueuePreview } from './';

const ChannelQueue = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const customChannelQueueFilter = (channels) => {
    return channels.filter(
      (channel) =>
        channel.type === 'messaging' &&
        channel?.data?.queueId !== null &&
        channel?.data?.queueId !== undefined,
    );
  };

  return (
    <ChannelList
      filters={{ members: { $in: [client.userID] } }}
      channelRenderFilterFn={customChannelQueueFilter}
      List={(listProps) => (
        <div className="channel-list__list">
          <div className="channel-list__header">
            <p className="channel-list__header__text">Queues</p>
          </div>
          <ChannelList {...listProps} Preview={QueuePreview} />
        </div>
      )}
      Preview={(previewProps) => (
        <QueuePreview
          {...previewProps}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
          type="messaging"
        />
      )}
    />
  );
};

export default ChannelQueue;

