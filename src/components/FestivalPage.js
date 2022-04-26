import React from 'react';
import { getFestivalById, postAttending } from '../api/festivals';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import dateFormat from 'dateformat';

function FestivalPage() {
  const { id } = useParams();

  const blankAttending = {
    festival: parseInt(id),
    arrival_date: '',
    depart_date: '',
    price_min: 0,
    price_max: 100,
    activities: [],
    comment: ''
  };
  const [singleFestival, setSingleFestival] = React.useState(null);
  const [attending, setAttending] = React.useState(blankAttending);
  const [isChecked, setIsChecked] = React.useState(
    new Array(attending.activities.length).fill(false)
  );
  const [moreInfo, setMoreInfo] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const festivalData = await getFestivalById(id);
      setSingleFestival(festivalData);
      setSearchTerm(festivalData.attending);
    };
    getData();
  }, [update]);

  function handleChange(event) {
    const value =
      event.target.name === 'price_max' || event.target.name === 'price_min'
        ? parseInt(event.target.value)
        : event.target.value;
    setAttending({ ...attending, [event.target.name]: value });
  }
  function changeAttendingView(event) {
    const userId = event.target.name;
    const data = singleFestival.attending.find(
      (user) => user.user.id == userId
    );
    setMoreInfo(data);
  }
  const rangeSelector = (event, newValue) => {
    setAttending({
      ...attending,
      price_max: newValue[1],
      price_min: newValue[0]
    });
    console.log(newValue[0], newValue[1]);
  };

  const checkBox = (event) => {
    const activity = event.target.value;

    setIsChecked(!isChecked);
    if (!attending.activities.includes(activity)) {
      setAttending({
        ...attending,
        activities: [...attending.activities, activity]
      });
    } else {
      setAttending({
        ...attending,
        activities: attending.activities.filter((a) => a !== activity)
      });
    }
  };
  function handleSubmit(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await postAttending(attending);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    setAttending(blankAttending);
    setUpdate(!update);
  }

  function activitySearch(event) {
    if (event.target.name === 'All') {
      setSearchTerm(singleFestival.attending);
    } else {
      const data = singleFestival.attending.filter((attend) =>
        attend.activities.includes(event.target.name)
      );
      setSearchTerm(data);
    }
  }

  console.log('data: ', attending);
  console.log('search term: ', searchTerm);

  if (!singleFestival) {
    return (
      <div className='background'>
        <div className='square'>
          <div className='top-heading'>
            <div className='logo' style={{ backgroundImage: `url(${logo})` }}>
              <h1 className='my-title'>Events</h1>
            </div>
          </div>
          <div className='loading-messages'>
            <p>loading..</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className='background-festival'
      style={{ backgroundImage: `url(${singleFestival.image}})` }}
    >
      <div className='square page-scroll'>
        <h1 className='mega-title'>{singleFestival.name}</h1>
        <div>
          <p className='my-title line-height'>{singleFestival.location}</p>
          <p className='my-title line-height'>
            {dateFormat(singleFestival.start_date, 'dddd, mmmm dS')} -
            {dateFormat(singleFestival.end_date, 'dddd, mmmm dS')}
          </p>
        </div>
        <div className='line'></div>
        <section className='festival-page-info'></section>
        <section className='attending-posts'>
          <h1 className='second-title'>Attending</h1>
          <h1 className='third-title'>
            Search for friends who want to do the same things as you.
          </h1>
          <div className='attending-search'>
            <div className='is-multiline'>
              <button
                className='activity-button'
                name='All'
                onClick={activitySearch}
              >
                All
              </button>

              {singleFestival.activities.map((activity) => (
                <button
                  className='activity-button'
                  name={activity}
                  onClick={activitySearch}
                  key={activity}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          <div className='attending-pics'>
            {!searchTerm ? (
              <p>loading</p>
            ) : (
              searchTerm.map((post) => (
                <img
                  key={post.id}
                  src={post.user.image}
                  width='100px'
                  className='profile-pic make-bigger attending-icons'
                  name={post.user.id}
                  onClick={changeAttendingView}
                />
              ))
            )}
          </div>
          <div>
            {!moreInfo ? (
              <p className='search-card-blank my-title'>
                Click on a user to view their details
              </p>
            ) : (
              <Link to={`/user/${moreInfo.user.id}`}>
                <div className='search-card'>
                  <div className='view-profile'>
                    <h1>{moreInfo.user.username}</h1>
                    <img
                      src={moreInfo.user.image}
                      className='profile-pic'
                      width='100px'
                    />
                    <button className='button-style'>View Profile</button>
                  </div>
                  <div className='info'>
                    <strong>Dates: </strong>
                    <h2>
                      {dateFormat(moreInfo.arrival_date, 'mmmm dS')} -
                      {dateFormat(moreInfo.depart_date, 'mmmm dS')}
                    </h2>
                    <div>
                      <strong>Activities: </strong>
                    </div>
                    {moreInfo.activities.map((activity) => (
                      <span key={activity}>🌴{activity}</span>
                    ))}
                    <div>
                      <strong>Message: </strong>
                      <p>{moreInfo.comment}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>
        <section>
          <div className='post-attendance'>
            <h1 className='second-title'>Post your Attendance</h1>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label>Dates</label>
                <div>
                  <input
                    type='date'
                    name='arrival_date'
                    onChange={handleChange}
                    value={attending.arrival_date}
                  />
                  <input
                    type='date'
                    name='depart_date'
                    onChange={handleChange}
                    value={attending.depart_date}
                  />
                </div>
              </div>

              <div className='field'>
                <div
                  style={{
                    display: 'block',
                    width: '300px',
                    margin: 'auto'
                  }}
                >
                  <label>Price Range</label>
                  <Slider
                    value={[attending.price_min, attending.price_max]}
                    onChange={rangeSelector}
                    valueLabelDisplay='auto'
                    min={0}
                    max={5000}
                    step={100}
                  />
                </div>
              </div>

              <div className='field'>
                <label>Activities</label>
                <div className='activities'>
                  {singleFestival.activities.map((activity, index) => (
                    <div key={activity} name='activites'>
                      <input
                        type='checkbox'
                        id={activity}
                        value={activity}
                        checked={isChecked[index]}
                        onChange={checkBox}
                      />
                      {activity}
                    </div>
                  ))}
                </div>
              </div>

              <div className='field'>
                <div>
                  <label>Comment</label>
                </div>

                <textarea
                  rows='4'
                  onChange={handleChange}
                  name='comment'
                  value={attending.comment}
                />
              </div>
              <input type='submit' className='activity-button make-bigger' />
            </form>
          </div>
        </section>
        <section>
          <h1 className='second-title'>Accommodation</h1>
          <div className='columns hotels'>
            {singleFestival.hotel.map((hotel) => (
              <div key={hotel.id} className='column is-one-third'>
                <div className='search-festival-card'>
                  <h1>{hotel.name}</h1>
                  <figure className='image is-4by3'>
                    <img className='card-image' src={hotel.image} />
                  </figure>

                  <div>
                    <Rating name='read-only' value={hotel.rating} readOnly />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FestivalPage;
