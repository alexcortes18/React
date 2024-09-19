/*
Using: STATES
This is ONE way of accepting user inputs, via userState. There are other ways, like using Refs, and in-built browser
options.
*/

import { useState, useRef } from "react";

export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });
  // This state is to keep track for "blur" or losing focus, which means that the user interacted with a field first,
  // and then clicked somewhere outside.
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@")

  function handleSubmit(event) {
    event.preventDefault(); // to prevent the default behavior when clicking a button inside a form.
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value
    }));

    setDidEdit(prevValues=> ({
      ...prevValues,
      [identifier]: false
    }))
  }

  function handleInputBlur(identifier){
    setDidEdit(prevEdit=>({
      ...prevEdit,
      [identifier]: true,
    }))
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
            onBlur={()=> handleInputBlur("email")}
          />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>
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
