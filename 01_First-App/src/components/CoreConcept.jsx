export default function CoreConcept(props) { // props are passed by React as an object of the attributes (or props) declared when using the Component.
    // function CoreConcept({image, title, description}) // We can also use object destructuring to receive the parameters of the object. We MUST use the same names as the ones used below when making the object.  
      return (
        <li>
          <img src={props.image} alt={props.title}></img>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <p>{props.description2}</p>
        </li>
      );
    }