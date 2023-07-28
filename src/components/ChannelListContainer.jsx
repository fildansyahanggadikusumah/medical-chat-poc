import React, { useState, useEffect } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';



import {  ActiveChannelList, ActiveChannelPreview, QueueList, QueuePreview, ChannelContainer, UserList } from './';
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout, handleToggleInvisible, invisible }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={handleToggleInvisible}>
            {invisible ? 'offline' : 'online'}
            </div>
    </div>
    <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner">
            <p>history</p>
            </div>
    </div>
  </div>
);

const CompanyHeader = ({}) => {
    const { client } = useChatContext();
    const username = cookies.get('username');
    const status = client.user?.online ? <div className="user-item__status user-item__status--online" /> : <div className="user-item__status user-item__status--offline" />;
  
 
  
    return (
      <div className="channel-list__header">
        <p className="channel-list__header__text">
          Medical Portal
        </p>
        <p className="channel-list__header__text">
        ({username})
        </p>
  
      </div>
    );
  };
  // const filters = { members: { $in: [client.userID] } };


 
  const customChannelQueueFilter = (channels) => {
    return channels
    .filter((channel) => channel.type === 'messaging' && channel?.data?.queueId)
  };

  

  const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel, index) => {
      return (
        index < 4 &&
        channel.type === 'messaging' &&
        (channel?.data?.queueId === null ||
          channel?.data?.queueId === undefined ||
          channel?.data?.queueId === '')
      );
    });
  };
  
  const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, handleChannelSelect, }) => {
    const { client } = useChatContext();
    const [invisible, setInvisible] = useState(client.user.invisible);
    const [toggleContainer, setToggleContainer] = useState(false);
    const [QueueCount, setQueueCount] = useState(0);
    const [channelCount, setChannelCount] = useState(0);



    useEffect(() => {
      async function getQueueCount() {
        const channels = await client.queryChannels({ type: 'messaging', members: { $in: [client.userID] } });
        const queueChannels = customChannelQueueFilter(channels);
        setQueueCount(queueChannels.length);
      }
      getQueueCount();
    }, [client]);
     
    useEffect(() => {
      async function getChannelCount() {
        const channels = await client.queryChannels({ type: 'messaging', members: { $in: [client.userID] }});
        const ActiveChannels = customChannelMessagingFilter(channels);
        setChannelCount(ActiveChannels.length);
      }
      getChannelCount();
    }, [client]);

    
  
  
    const handleToggleInvisible = async (updatedInvisible) => {
        setInvisible(updatedInvisible);
        await client.upsertUser({
          id: client.user.id,
          invisible: updatedInvisible,
        });
      };
  
    const logout = () => {
      cookies.remove('token');
      cookies.remove('userId');
      cookies.remove('username');
      cookies.remove('fullName');
      cookies.remove('avatarURL');
      cookies.remove('hashedPassword');
      cookies.remove('phoneNumber');
  
      window.location.reload();
    };

   

  const filters = { members: { $in: [client.userID] } };
  const sort = [{created_at: 1}];
  
  return (
    <>
      <SideBar 
        logout={logout}
        handleToggleInvisible={() => handleToggleInvisible(!invisible)} 
        invisible={invisible}
      />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />

        
        <div className="team-channel-list">
        <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                Active Channel ({channelCount})
                </p>
            </div>
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <ActiveChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    
                    
                    Preview={(previewProps) => (
                        <ActiveChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                  
                />
                </div>

                <div className="team-channel-list">
                  <div className="team-channel-list__header">
                      <p className="team-channel-list__header__title">
                          Queue ({QueueCount})
                      </p>

                  </div>
            
                 <ChannelList            
                    filters={filters}
                    channelRenderFilterFn={customChannelQueueFilter}
                    setActiveChannel={false}
                    sort={sort}
                    List={(listProps) => (
                        <QueueList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setCreateType={setCreateType} 
   

                        />
                    )}
                    Preview={(previewProps) => (
                        <QueuePreview 
                            {...previewProps}
                            isQueuePreview={true} 
                            
                        />
                    )}
                />
                </div>
                
            </div>
        </>
    );
}



const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, isEditing, createType, isCreating, channel }) => {


  return (
    <>
    
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          isEditing={isEditing} 
          createType={createType} 
        />
      </div>

      <div className="app__wrapper">
          <div className="channel__container">
            <ChannelContainer
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              createType={createType}
            />
          </div>
      </div>

     
    </>
  );
};

export default ChannelListContainer;


// import { ChannelInner, CreateChannel, EditChannel } from './';
// import { Channel, MessageTeam } from 'stream-chat-react';

// const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType, channel }) => {
  
//   if(isCreating) {
//       return (
//           <div className="channel__container">
//               <CreateChannel createType={createType} setIsCreating={setIsCreating} />
//           </div>
//       )
//   }

//   if(isEditing) {
//       return (
//           <div className="channel__container">
//               <EditChannel setIsEditing={setIsEditing} />
//           </div> 
//       )
//   }

//   const EmptyState = () => (
//       <div className="channel-empty__container">
//           <p className="channel-empty__first">This is the beginning of your chat history.</p>
//           <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
//       </div>
//   )

//   return (
//       <div className=" channel__container">
//           <Channel
//               EmptyStateIndicator={EmptyState}
//               Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
//           >

//               <ChannelInner setIsEditing={setIsEditing} />
//           </Channel>
//       </div>
//   );
// }



// const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, isEditing, createType }) => {
//     const [toggleContainer, setToggleContainer] = useState(false);
//     const [selectedChannelId, setSelectedChannelId] = useState(null); // Added state for tracking the selected channel


//      // Function to handle channel selection and toggle the visibility of ChannelContainer
//   const handleChannelSelect = (channelId) => {
//     setSelectedChannelId((prevSelectedChannelId) =>
//       prevSelectedChannelId === channelId ? null : channelId
//     );
//   };

//   return (
//     <>
//       <div className="channel-list__container">
//         <ChannelListContent
//           setIsCreating={setIsCreating}
//           setCreateType={setCreateType}
//           setIsEditing={setIsEditing}
//           handleChannelSelect={handleChannelSelect} // Pass the handleChannelSelect function as a prop
//         />
//       </div>

//       <div
//         className="channel-list__container-responsive"
//         style={{
//           left: toggleContainer ? "0%" : "-89%",
//           backgroundColor: "#005fff"
//         }}
//       >
//         <div
//           className="channel-list__container-toggle"
//           onClick={() =>
//             setToggleContainer((prevToggleContainer) => !prevToggleContainer)
//           }
//         ></div>
//         <ChannelListContent
//           setIsCreating={setIsCreating}
//           setCreateType={setCreateType}
//           setIsEditing={setIsEditing}
//           handleChannelSelect={handleChannelSelect} // Pass the handleChannelSelect function as a prop
//         />
//       </div>

//       {!selectedChannelId && ( // Hide ChannelContainer if no channel is selected
//         <ChannelContainer
//           isCreating={isCreating}
//           setIsCreating={setIsCreating}
//           isEditing={isEditing}
//           setIsEditing={setIsEditing}
//           createType={createType}
//         />
//       )}
//     </>
//   );
// };

// export default ChannelListContainer;