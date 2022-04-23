import React from 'react';
import { useParams } from 'react-router-dom';
import { getFriendsMessages } from '../api/messages';
import { sendMessage } from '../api/messages';

function Messages() {
  const { id } = useParams();
  const [messages, setMessages] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const messageTemplate = {
    destination_user: id,
    text: ''
  };
  const [messageText, setMessageText] = React.useState(messageTemplate);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const messageData = await getFriendsMessages(id);
        const sortedData = messageData.sort((a, b) =>
          a.created_date < b.created_date ? -1 : 1
        );
        setMessages(sortedData);
      } catch (err) {
        console.log('get all messages error: ', err);
      }
    };
    getData();
  }, [update]);

  function handleChange(event) {
    setMessageText({ ...messageText, text: event.target.value });
  }

  function onSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await sendMessage(messageText);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    setUpdate(!update);
    setMessageText(messageTemplate);
  }

  console.log('message data: ', messages);
  console.log('update', update);

  if (!messages) {
    return <p>loading..</p>;
  } else {
    return (
      <div>
        <section>
          <div className='message-box'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.destination_user.id == id
                    ? 'my-message'
                    : 'friends-message'
                }`}
              >
                <div>
                  <img src={message.source_user.image} width='70px' />
                  <h1>{message.source_user.username}</h1>
                </div>
                <p>{message.text}</p>
                <p>{message.created_date}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div>
            <input
              type='text'
              name='message'
              onChange={handleChange}
              value={messageText.text}
            />
            <button onClick={onSubmit}>Send</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Messages;
