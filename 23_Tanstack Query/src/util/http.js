export async function fetchEvents({signal, searchTerm}) { //destructuring same as FinEventSection.jsx
    // signal is used by ReactQuery to abort this fetching if it thinks it should do that, for example if we 
    // leave the page.

    console.log(searchTerm);
    let url = 'http://localhost:3000/events';

    if(searchTerm){
        url += '?search=' + searchTerm;  // adding a query search to the url
    }

    const response = await fetch(url, {signal:signal}); //the built in fetch function has a second property which
    // accepts a configuration object in which we can include the signal property that comes from ReactQuery's
    // queryFn.

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();

    return events;
}

// This is for useMutation, that we are using in NewEvent.jsx
export async function createNewEvent(eventData) {
    const response = await fetch(`http://localhost:3000/events`, {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while creating the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { event } = await response.json();
  
    return event;
  }