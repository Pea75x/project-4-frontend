import React from 'react';
import { useParams } from 'react-router-dom';
import { getPublicUser } from '../api/auth';
import { Link } from 'react-router-dom';

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
    return (
      <div className='background'>
        <div className='square'>
          <p>Loading..</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className='background'>
        <div className='square'>
          <section>
            <div className='user-section'>
              <img
                width='250px'
                className='profile-pic'
                src={userProfile.image}
              />
              <h1 className='my-title public-profile'>
                {userProfile.username}
              </h1>
            </div>
          </section>
          <Link to={`/messages/${userProfile.id}`}>
            <button className='button-style'>Send a message</button>
          </Link>
          <section>
            <div>
              <h1 className='second-title'>Attending:</h1>
              <div className='columns'>
                {userProfile.attending.map((event) => (
                  <div
                    key={event.id}
                    className='column is-one-quarter is-centered'
                  >
                    <div className='search-festival-card'>
                      <p>{event.festival.name}</p>
                      <figure className='image is-4by3'>
                        <img
                          className='card-image'
                          src={event.festival.image}
                        />
                      </figure>

                      <p>{event.festival.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default PublicProfile;
