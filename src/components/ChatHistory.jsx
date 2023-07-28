// import React, { useState, useEffect } from 'react';
// import { useChatContext, useChannelStateContext } from 'stream-chat-react';

// import axios from 'axios';

// const ChatHistory = () => {
//   const [cids, setCids] = useState([]);
//   const { channel } = useChannelStateContext();
//   const {client } = useChatContext();
//   const [selectedCid, setSelectedCid] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     fetchCIDs();
//   }, []);

//   const fetchCIDs = async () => {
//     try {
//       const members = Object.values(channel.state.members).filter(
//         ({ user }) => user.role === 'user'
//       );
      
//       const memberIds = members.map(({ user }) => user.id);

//       const response = await axios.get(`http://localhost:5000/history/channels?memberId=${memberIds}`);
      
//       const { cids } = response.data;
//       setCids(cids);
//     } catch (error) {
//       console.error('Failed to fetch CIDs:', error);
//     }
//   };

//   const fetchMessageHistory = async (cids) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/history?cid=${cids}`);
//       const { historyList } = response.data;
//       setMessages(historyList);
//       setSelectedCid(cids);
//     } catch (error) {
//       console.error('Failed to fetch message history:', error);
//     }
//   };

//   return (
//     <div className="create-channel__container">
//       <div className="create-channel__header">
//         <h2>Chat History </h2>
//         </div>
//           <button>Back</button>
        
//         <div className="team-channel-list">
//           <h3>History:</h3>
//           <ul>
//             {cids.map((cid) => (
//               <li key={cid}>
//                 <button onClick={() => fetchMessageHistory(cids)}>{cids}</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {selectedCid && (
//           <div>
//             <h3>Message History</h3>
//             <ul>
//               {messages.map((message) => (
//                 <li key={message.id}>{message.fullname}: {message.text}</li>
//               ))}
//             </ul>
//           </div>
//         )}
      
//     </div>
//   );
// };

//   export default ChatHistory;


import React, { useState, useEffect } from 'react';
import { useChatContext, useChannelStateContext } from 'stream-chat-react';
import axios from 'axios';

const ChatHistory = ({ setShowChatHistory }) => {
  const [cids, setCids] = useState([]);
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const [selectedCid, setSelectedCid] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchCIDs();
  }, []);

  const fetchCIDs = async () => {
    try {
      const members = Object.values(channel.state.members).filter(({ user }) => user.role === 'user');
      const memberIds = members.map(({ user }) => user.id);
      const response = await axios.get(`http://localhost:5000/history/channels?memberId=${memberIds}`);
      const { cids } = response.data;
      setCids(cids);
    } catch (error) {
      console.error('Failed to fetch CIDs:', error);
    }
  };

  const fetchMessageHistory = async (cid) => {
    try {
      const response = await axios.get(`http://localhost:5000/history?cid=${cid}`);
      const { historyList } = response.data;
      setMessages(historyList);
      setSelectedCid(cid);
    } catch (error) {
      console.error('Failed to fetch message history:', error);
    }
  };

  const handleBack = () => {
    setShowChatHistory(false);
  };

  const getTimeFromCreatedAt = (createdAt) => {
  const time = new Date(createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return time;
};

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <h2>Chat History</h2>
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="team-channel-list">
        <h3>History:</h3>
        <ul>
          {cids.map((cid) => (
            <li key={cid}>
              <button onClick={() => fetchMessageHistory(cid)}>{cid}</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedCid && (
        <div>
          <h3>Message History</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {messages.map((message) => (
              <li key={message.id}>
                <span className='time'>{getTimeFromCreatedAt(message.created_at)}</span> {message.fullname}:{' '}
              {message.asset_url ? (
                <a href={message.asset_url}>{message.title}</a>
              ) : message.image_url ? (
                <img src={message.image_url} alt="Message Image" className='image-style' />
              ) : (
                message.text
              )}
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
