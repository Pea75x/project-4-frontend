import React from 'react';
import { getFestivals } from '../api/festivals';
import FestivalCard from './FestivalCard';

function FestivalSearch() {
  const [allfestivals, setAllFestivals] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const festivalData = await getFestivals();
        setAllFestivals(festivalData);
      } catch (err) {
        console.log('get all festivals error: ', err);
      }
    };
    getData();
  }, []);

  console.log(allfestivals);

  return (
    <>
      <div className='background'>
        <div className='square'>
          <h1 className='my-title'>Events</h1>
          <div>
            {!allfestivals ? (
              <p>Loading data...</p>
            ) : (
              <div className='columns is-multiline scroll'>
                {allfestivals.map((festival) => (
                  <div
                    key={festival._id}
                    className='column is-one-third-desktop mt-6'
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
