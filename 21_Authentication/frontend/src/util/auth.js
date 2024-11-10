import { redirect } from 'react-router-dom';

export function getAuthToken(){
    const token = localStorage.getItem('token');
    return token;
}

export function tokenLoader(){
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token){
        return redirect('/auth');
    }

    return null; // a loader SHOULD ALWAYS return something. If the previous if was not met, then it returns nothing, which
    // is wrong. Loaders are expected to return a value.
}