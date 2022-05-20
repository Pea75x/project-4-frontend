import React from 'react';
import { useParams } from 'react-router-dom';
import { getFriendsMessages } from '../api/messages';
import { getPublicUser } from '../api/auth';
import { sendMessage } from '../api/messages';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import * as TiIcons from 'react-icons/ti';

function Messages() {
  const { id } = useParams();
  const [messages, setMessages] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const messageTemplate = {
    destination_user: id,
    text: ''
  };
  const [messageText, setMessageText] = React.useState(messageTemplate);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getPublicUser(id);
        setUserProfile(userData);
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
    setMessageText(messageTemplate);
    setUpdate(!update);
  }
  console.log('message data: ', messages);
  console.log('update', update);

  if (!messages) {
    return (
      <div className='background'>
        <div className='square'>
          <div className='loading-messages'>
            <p>loading..</p>
          </div>
        </div>
      </div>
    );
  } else if (messages.length < 1) {
    return (
      <div className='background'>
        <div className='square'>
          <Link to='/messages/'>
            <div className='back-button'>
              <TiIcons.TiArrowBackOutline />
            </div>
          </Link>
          <section>
            <div className='user-section'>
              <Link to={`/user/${userProfile.id}/`}>
                <img
                  width='200px'
                  className='profile-pic'
                  src={userProfile.image}
                />
              </Link>
              <h1 className='my-title'>{userProfile.username}</h1>
            </div>
          </section>
          <section>
            <p className='no-messages'>Dont be shy! Give them a message!</p>
            <div className='message-input'>
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
      </div>
    );
  } else {
    return (
      <div className='background'>
        <div className='square'>
          <Link to='/messages/'>
            <div className='back-button'>
              <TiIcons.TiArrowBackOutline />
            </div>
          </Link>

          <section>
            <div className='user-section'>
              <img
                width='200px'
                className='profile-pic profile-icons'
                src={userProfile.image}
              />
              <h1 className='title'>{userProfile.username}</h1>
            </div>
          </section>
          <section>
            <div className='message-box'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.destination_user.id == id
                      ? 'my-message'
                      : 'friends-message'
                  } single-message`}
                >
                  <img
                    className='profile-pic profile-pic-username'
                    src={message.source_user.image}
                  />
                  <div className='message-text'>
                    <p>{message.text}</p>
                    <p>
                      <em>
                        {dateFormat(
                          message.created_date,
                          'dddd, mmmm dS, h:MM TT'
                        )}
                      </em>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className='message-input'>
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
      </div>
    );
  }
}

export default Messages;
