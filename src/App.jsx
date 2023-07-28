import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'fxdkvq9mtyxp';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);




if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('photoProfile'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
        specialist: cookies.get('specialist'),
        providerName: cookies.get('providerName'),
        workName: cookies.get('workName'),
    }, authToken)


}

const App = ({}) => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


  
    if(!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light" doNotMarkMessagesAsRead={true}>
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    client={client}
                />
                
            </Chat>
            
        </div>
    );
    
  }
  


export default App;
