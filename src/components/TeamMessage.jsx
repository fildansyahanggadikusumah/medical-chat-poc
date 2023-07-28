import React from 'react';
import { MessageText, useMessageContext } from 'stream-chat-react';

const TeamMessage = () => {
    const { handleOpenThread, message } = useMessageContext();

    return (
        <MessageText
            message={{ ...message, user: {}}}
            // handleOpenThread={}
        />
    )
}

export default TeamMessage

// import React from 'react';
// import { MessageText, useMessageContext } from 'stream-chat-react';

// const TeamMessage = () => {
//   const { channel, client, message, threadList } = useMessageContext();

//   const isMyMessage = message.user.id === client.userID;

//   return (
//     <div className={`message ${isMyMessage ? 'message--mine' : 'message--other'}`}>
//       <MessageText
//         message={{ ...message, user: {}}}
//         isMyMessage={isMyMessage}

//       />
//     </div>
//   );
// };

// export default TeamMessage;


