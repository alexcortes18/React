import { Fragment } from 'react';
import Header from './components/Header/Header.jsx'
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {
  return (
    // <Fragment> {/* Instead of using div having it empty.*/}
    <> {/* Instead of Fragment and div, we can just use it empty (in React) */}
      <Header></Header> {/*or also can be <Header/> */}
      <main>
        <CoreConcepts/>
        <Examples/>
      </main>
    </>
    // </Fragment>
  );
}

export default App;
