import React from 'react';
import { getMyMessages } from '../api/messages';
import { Link } from 'react-router-dom';

function AllMessages() {
  const [chats, setChats] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const messages = await getMyMessages();

        const filteredMessages = Array.from(
          new Set(messages.map((message) => message.destination_user.id))
        ).map((id) => {
          return messages.find((message) => message.destination_user.id === id);
        });

        setChats(filteredMessages);
      } catch (err) {
        console.log('get all messages error: ', err);
      }
    };
    getData();
  }, []);
  console.log('chats: ', chats);

  if (!chats) {
    return (
      <div className='background'>
        <div className='square'>
          <h1 className='my-title'>My Messages</h1>
          <div className='loading-messages'>
            <p>loading..</p>
          </div>
        </div>
      </div>
    );
  } else if (chats.length < 1) {
    return (
      <div className='background'>
        <div className='square'>
          <h1 className='my-title'>My Messages</h1>
          <div className='loading-messages'>
            <p>No messages yet!</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='background'>
        <div className='square'>
          <h1 className='my-title'>My Messages</h1>
          <div className='display-friends'>
            {chats.map((friend) => (
              <Link
                key={friend.id}
                to={`/messages/${friend.destination_user.id}`}
              >
                <div className='friends-card'>
                  <img
                    className='profile-pic'
                    src={friend.destination_user.image}
                    width='200px'
                  />{' '}
                  <h1 className='username'>
                    {friend.destination_user.username}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AllMessages;
