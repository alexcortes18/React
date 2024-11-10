import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    // This is to get the duration of the expiration date of the token. In Authentication.js we set the expiration
    // date to be 1 hour in the future when the user logs in. Now, this function helps to see if the time has passed
    // or not.

    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime(); //.getTime() is to get in milliseconds.

    return duration // if duration is positive, the expiration time has not expired yet.
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration<0){
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null; // a loader SHOULD ALWAYS return something. If the previous if was not met, then it returns nothing, which
    // is wrong. Loaders are expected to return a value.
}