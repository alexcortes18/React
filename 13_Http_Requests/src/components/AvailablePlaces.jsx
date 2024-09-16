import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, SetError] = useState();

  // We need useEffect because if not, will creat an infinite loop because of using setAvailablePlaces 
  // which will render again the component AvailablePlaces.
  useEffect(() => {
    // fetch('http://localhost:3000/places').then((response) => {
    //   return response.json()
    // }).then((resData) => {
    //   setAvailablePlaces(resData.places);
    // });
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const response = await fetch('http://localhost:3000/places2');
        const resData = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch places')
        }
        setAvailablePlaces(resData.places);
      }
      catch (error) { //
        SetError({message: error.message || "Could not fetch places, try again later"});
      }
      setIsFetching(false);
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