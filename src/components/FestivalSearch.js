import React from 'react';
import { getFestivals } from '../api/festivals';
import FestivalCard from './FestivalCard';
import logo from '../images/logo.png';
import { getFestivalByName } from '../api/festivals';

function FestivalSearch() {
  const [allfestivals, setAllFestivals] = React.useState(null);
  const [searchCriteria, SetSearchCriteria] = React.useState(null);

  React.useEffect(() => {
    if (!searchCriteria) {
      const getData = async () => {
        try {
          const festivalData = await getFestivals();
          setAllFestivals(festivalData);
        } catch (err) {
          console.log('get all festivals error: ', err);
        }
      };
      getData();
    } else {
      const getData = async () => {
        try {
          const festivalData = await getFestivalByName(searchCriteria);
          setAllFestivals(festivalData);
        } catch (err) {
          console.log('get all festivals error: ', err);
        }
      };
      getData();
    }
  }, [searchCriteria]);

  function handleSearch(event) {
    SetSearchCriteria(event.target.value);
  }

  console.log(allfestivals);

  return (
    <>
      <div className='background'>
        <div className='square'>
          <div className='top-heading'>
            <div className='logo' style={{ backgroundImage: `url(${logo})` }}>
              <h1 className='my-title'>Events</h1>
            </div>
          </div>
          <div className='search-bar'>
            <input
              type='text'
              onChange={handleSearch}
              name='name'
              placeholder='search'
              className='input'
            />
          </div>

          <div className='search-scroll'>
            {!allfestivals ? (
              <p>Loading data...</p>
            ) : (
              <div className='columns is-multiline scroll'>
                {allfestivals.map((festival) => (
                  <div
                    key={festival._id}
                    className='column is-one-third is-one-third-mobile'
                  >
                    <FestivalCard {...festival} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FestivalSearch;
