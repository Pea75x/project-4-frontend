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
      <div>
        <h1>{userProfile.username}</h1>
        <img src={userProfile.image} />
      </div>
    );
  }
}

export default PublicProfile;
