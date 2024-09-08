import CoreConcept from "./CoreConcept.jsx"; //component
import { CORE_CONCEPTS } from "../data.js"; //data

export default function CoreConcepts(){
    return(
        <section id="core-concepts">
        <h2>Time to get started!</h2>
        <ul>
          {/* <CoreConcept  // When adding the props, all the props added to the same component are bundle into the ones sent as an object to the Original Component.
            title={CORE_CONCEPTS[0].title}
            description={CORE_CONCEPTS[0].description}
            image={CORE_CONCEPTS[0].image}
          />
          <CoreConcept {...CORE_CONCEPTS[1]} />  
          <CoreConcept {...CORE_CONCEPTS[2]} />
          <CoreConcept {...CORE_CONCEPTS[3]} /> */}
          {/* Instead of using this ^, we can do it more dynamically as follows: */}
          {CORE_CONCEPTS.map(item => <CoreConcept key={item.title} {...item}></CoreConcept>)}
          {/* Explanation: We take each item of the array of CORE_CONCEPTS and map it inside into the 
          component CoreConcept while using the spread operator. 
          key={item.title} -> this is used to avoid a warning by React that tells us that each element in the list must be unique*/}
        </ul>
      </section>
    );
}