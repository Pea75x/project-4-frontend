import React from 'react';
import { useParams } from 'react-router-dom';
import { getPublicUser } from '../api/auth';

function PublicProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const userData = await getPublicUser(id);
      setUserProfile(userData);
    };
    getData();
  }, []);

  console.log(userProfile);

  if (!userProfile) {
    return <p>Loading..</p>;
  } else {
    return (
      <div className='background'>
        <div className='square'>
          <section>
            <div className='user-section'>
              <img
                width='300px'
                className='profile-pic'
                src={userProfile.image}
              />
              <h1 className='title'>{userProfile.username}</h1>
            </div>
          </section>
          <section>
            <div>
              <h1>Attending:</h1>
              {userProfile.attending.map((event) => (
                <div key={event.id}>
                  <h1>{event.festival.name}</h1>
                  <img src={event.festival.image} width='150px' />
                  <p>{event.festival.location}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default PublicProfile;
