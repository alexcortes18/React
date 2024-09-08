import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storePlaces = storeIds.map((id) =>
  AVAILABLE_PLACES
    .find((place) => place.id === id));
// .filter((place) => place !== undefined);

function App() {
  // const modal = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storePlaces);

  // useEffect does not return a value. It has 2 arguments. The first one is the wrapper where we must introduce the code
  // that will handle the "side effect" (in this case getting the user geo-location and sorting availablePlaces accordingly from 
  // the nearest placest to the farthest.)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => { //position object is given by the browser too.
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    }); // navigator is an object provided by the browser.
  }, []); // This array is for dependecy values. These values are PROPS or STATE values that are used inside the useEffect function.
  //If this values change the useEffect will be re-executed. If we leave the array
  //empty then this function will execute only ONCE after App() is executed for the first time.

  // useEffect will be excuted AFTER the APP component function is done.

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // This is another example of a Side Effect:

    // localstorage is another object given by the browser
    // This code gets the selected IDs from the localstorage, and if none is selected returns to storeId an empty array.
    // Then if we select a new place, it is added to the localStorage object.
    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storeIds.indexOf(id) === -1) { //Id the ID has not been selected, then update the ID list.
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds]));
    }
    // JSON.parse() -> makes an array from a list of strings
    // JSON.stringify() -> makes a string from an array (which is needed by set.Item() as the second argument).
  }

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModalIsOpen(false);
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModalIsOpen(false);

    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storeIds.filter(id => id !== selectedPlace.current)))
  }, []); // Only add prop, state values, or any other values that depend on state values (context values, other functions).


  return (
    <>
      {/* <Modal ref={modal}> */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText="Sorting places by distance..."
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
