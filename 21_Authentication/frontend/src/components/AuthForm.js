import { Form, Link, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // Query parameters are a way to pass additional information to a URL in the form of key-value pairs, 
  // which come after a question mark (?) in the URL. They’re commonly used to indicate a specific state or 
  // option without changing the page’s path.
  const [searchParams, setSearchParams] = useSearchParams(); // this is for Query Parameters
  const isLogin = searchParams.get('mode') === 'login'; // we are searching the query parameter of the URL. (?)

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
