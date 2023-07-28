

import React, { useState, useEffect } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const QueuePreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, isQueuePreview }) => {
  const { channel: activeChannel, client } = useChatContext();
  const [showOptions, setShowOptions] = useState(false);
  const [emptyQueueChannels, setEmptyQueueChannels] = useState([]);

  useEffect(() => {
    setShowOptions(false);
    if (isQueuePreview && activeChannel?.id === channel?.id) {
      setActiveChannel(false);
    }
  }, [isQueuePreview, activeChannel, channel, setActiveChannel]);

  useEffect(() => {
    async function getEmptyQueueChannels() {
      const channels = await client.queryChannels({ type: 'messaging' , members: { $in: [client.userID] }}, );
      const emptyQueueChannels = channels.filter(
        (channel) => (channel?.data?.queueId === null ||
          channel?.data?.queueId === undefined ||
          channel?.data?.queueId === '')
      );
      setEmptyQueueChannels(emptyQueueChannels);
    }
    getEmptyQueueChannels();
  }, [client]);

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    console.log(members[0]);

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === 'startChat') {
      channel.updatePartial({
        set: {
          queueId: '',
          timer: Date.now() + 10 * 60 * 1000,
        },
      });
    } else if (selectedOption === 'deleteChat') {
      channel.delete();
    }
  };

  const shouldDisplayOptions = emptyQueueChannels.length < 4 && !(channel?.data?.queueId === null ||
    channel?.data?.queueId === undefined ||
    channel?.data?.queueId === '');

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        if (shouldDisplayOptions) {
          if (showOptions) {
            setShowOptions(false);
            setActiveChannel(false);
          } else {
            setShowOptions(true);
            setActiveChannel(false);
          }
        }
      }}
    >
      <DirectPreview />

      {shouldDisplayOptions && showOptions && (
        <div className="channel-preview__options">
          <select onChange={handleOptionChange} onClick={(e) => e.stopPropagation()}>
            <option value="0">select:</option>
            <option value="startChat">add</option>
            <option value="deleteChat">Reject</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default QueuePreview;