/*
Use the correct Counter based on which redux you want to practice:
- Counter.js -> for Redux-toolkit usage.
- Counter-old.js -> for standard Redux usage.
*/

import { useSelector } from 'react-redux';

import Header from './components/Header.js'
import Auth from './components/Auth.js'
import UserProfle from './components/UserProfile.js'
import Counter from './components/Counter.js';
// import Counter from './components/Counter-old.js'

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated); //.auth because of the name of the key in the configureStore

  return (
    <>
    <Header/>
    {!isAuth &&<Auth/>}
    {isAuth &&<UserProfle/>}
    <Counter />

    </>
  );
}

export default App;
