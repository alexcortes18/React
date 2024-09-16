import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, SetError] = useState();

  // We need useEffect because if not, will creat an infinite loop because of using setAvailablePlaces 
  // which will render again the component AvailablePlaces.
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {

      try {
        const places = await fetchAvailablePlaces();

        // Updating the places by how close they are to our current position using the navigator object from the browser.
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false); // We change the location of setIsFetching to here because navigator does not accept
          // and 'await' does not work with 'navigator'
        });
      }
      catch (error) { //
        SetError({message: error.message || "Could not fetch places, try again later"});
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if(error){
    return <ErrorPage title="An error has ocurred!" message= {error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}