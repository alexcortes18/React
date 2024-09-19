/*
Using: STATES
This is ONE way of accepting user inputs, via userState. There are other ways, like using Refs, and in-built browser
options.
*/

import { useState } from "react";

export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  function handleSubmit(event) {
    event.preventDefault(); // to prevent the default behavior when clicking a button inside a form.

    console.log('User email:' + enteredValues.email);
    console.log('User password:' + enteredValues.password);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues)=>({
      ...prevValues,
      [identifier]: value
    }));
  }

  return (
    // instead of using an "onClick" for the buttons we can use an "onSubmit" for the form and change the default behavior
    // of the form. If we decide to use the button without onSubmit, we have to add the type="button" to the button.
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={enteredValues.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
          id="password" 
          type="password" 
          name="password" 
          value={enteredValues.password}
          onChange={(event) => handleInputChange("password", event.target.value)}
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
