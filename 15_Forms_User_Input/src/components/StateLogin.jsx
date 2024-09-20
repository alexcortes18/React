/*
Using: STATES
This is ONE way of accepting user inputs, via userState. There are other ways, like using Refs, and in-built browser
options.
*/


import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "./hooks/useInput";

export default function StateLogin() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6))

  function handleSubmit(event) {
    event.preventDefault(); // to prevent the default behavior when clicking a button inside a form.

    if (emailHasError || passwordHasError) {
      return; // to avoid continuing further code in handleSubmit if we had any, like a http request.
    }

    console.log(emailValue, passwordValue);
  }

  return (
    // instead of using an "onClick" for the buttons we can use an "onSubmit" for the form and change the default behavior
    // of the form. If we decide to use the button without onSubmit, we have to add the type="button" to the button.
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange} // we are by default giving it the 'event' object that it needs.
          value={emailValue}
          error={emailHasError && 'Please enter a valid email!'}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password! (Minimum 6 characters).'}
        />
      </div>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
