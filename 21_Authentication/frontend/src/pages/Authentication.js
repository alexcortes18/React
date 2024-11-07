import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  /*
    This function here handles the form submittion (from <Form>) from the <AuthForm>. We are doing this to validate
    that the user exists.

    Steps:
    1. Get the query parameters (?mode) from the URL.
    2. Get the data from the Form (request.formData())
    3. Create the object (authData) to send as response data to the backend.
    4. Send it with 'await fetch()'
    5. If we get a status response from backend as errors we send those forward to the frontend.
    6. If we are succesful with validating the user/pass, we redirect the user to the homepage "/"
  */


  const searchParams = new URL(request.url).searchParams; // this is a way to get the searchParams from the URL
  // given that we cannot use useSearchParams in here

  const mode = searchParams.get('mode') || 'login';

  if(mode !== 'login' && mode !== 'signup'){
    throw json({message: "Unsupported Mode"}, {status: 422});
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData),
  });


  // Some possible errors to send forward
  if (response.status === 422 || response.status === 401){
    return response;
  }

  if (!response.ok){
    throw json({message: 'Could not authenticate user'}, {stauts: 500})
  }

  // soon: manage the token from the backend.

  return redirect('/');

}