/*
USING: REFS.
This is another way of accepting user inputs, via refs. It is more clean and lean code, but can become more cumbersome 
if we have a lot of refs to declare. Also to clean the values of the current refs, we *could* use email.current.value='' 
for example, but this is discourage, as it is imperative code, and not the usual React's declarative code.
options.
*/

import { useRef } from "react";

export default function RefLogin() {
  const email = useRef();
  const password = useRef();


  function handleSubmit(event) {
    event.preventDefault(); // to prevent the default behavior when clicking a button inside a form.

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log('User email:' + enteredEmail);
    console.log('User password:' + enteredPassword);
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
          id="password" 
          type="password" 
          name="password" 
          ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
