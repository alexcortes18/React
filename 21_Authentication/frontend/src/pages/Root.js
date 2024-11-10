import { Outlet, useNavigation, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();

  // In the backend: /backend/util/auth -> the token expires in 1 hour: (expiresIn: '1h'). So also accordingly, we have
  // to log out the user in the frontend if that happens. We do this in the root path because this is the first one to
  // be render when the application starts.
  const token = useLoaderData();
  const submit = useSubmit(); // to submit programatically (this causes the action function to be called, whichever it is we
  // want to call).

  useEffect(()=> {
    if(!token){
      return // if token is invalid, nothing happens since we don't need to logout anyone.
    }
    if(token === 'EXPIRED'){ //set in /backend/utl/auth.js
      submit(null, {action: '/logout', method:'post'}); //we call the action from the 'logout' path.
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    
    setTimeout(()=>{
      submit(null, {action: '/logout', method:'post'});
    }, tokenDuration); //1 hour in milliseconds.
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
