import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ImagePicker from '../ImagePicker.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { fetchSelectableImages } from '../../util/http.js';

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event-images'], //if the query will always be the same, we can hardcode the queryKey. This will run when the
    // component gets executed for the first time.
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // FormData: Collects all form input fields (with name attributes) and their values into a FormData object.

    // Object.fromEntries(formData):
    // Converts the FormData object into a plain JavaScript object. Example:
    // {
    //   title: "My Event",
    //   description: "An amazing event",
    // }

    // Then we just add one more entry which would me the image name text:

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>

      {isPending && <p>Loading selectable images...</p>}
      {isError && (
        <ErrorBlock
          title={"Failed to load selectable images"}
          message={"Please try again later"} />)}
      {data && (
        <div className="control">
          <ImagePicker
            images={data} //data comes from our custom http.js file with our specific custom functions. In this case
            // from fetchSelectableImages()
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
