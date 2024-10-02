/*
Use the correct Counter based on which redux you want to practice:
- Counter.js -> for Redux-toolkit usage.
- Counter-old.js -> for standard Redux usage.
*/

import Header from './components/Header.js'
import Auth from './components/Auth.js'
import Counter from './components/Counter.js';
// import Counter from './components/Counter-old.js'

function App() {
  return (
    <>
    <Header/>
    <Auth/>
    <Counter />

    </>
  );
}

export default App;
