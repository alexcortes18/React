export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch places')
  }
  return resData.places
}

export async function updateUserPlaces(places) {
  //response from backend
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places}),
    headers: {
      'Content-Type': 'application/json' //important to tell the server that we want to send json type object.
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch places')
  }

  const resData = await response.json();
  return resData.message;
}