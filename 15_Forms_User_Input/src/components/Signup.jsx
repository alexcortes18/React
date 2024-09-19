/*
Using: FORMDATA -> default built in browser option.
This is the third way of getting information from the users. This is a good way to get a lot of data in a quick
clean lean code.
*/


export default function Signup() {
    function handleSubmit(event) {
        event.preventDefault();

        // BUILT-IN by the browser to make it easier dealing with input data.
        // For this to work, ALL inputs must have the "name" prop in them.
        const formData = new FormData(event.target); //The event.target here is the form itself.

        // .entries() -> gives us an array of all the key-pair values from the input fields.
        // .fromEntries() -> converts the array (or iterator) into an object.
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        // Since the checkboxes for "How did you find us?" have the same `name` attribute,
        // `Object.fromEntries()` only keeps the last value by default. 
        // To capture all checked values, we can get them by making a new value for the object:
        const acquisitionChannel = formData.getAll("acquisition"); // `getAll` returns an array of all values for the specified name.
        data.acquisition = acquisitionChannel;
        console.log(data); // Outputs an object with all acquisition channels, e.g., { acquisition: ['google', 'friend'] }

        // To reset the form we can either use the "type='reset'" in a button, or this:
        // event.target.reset();
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                    />
                </div>
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" />
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other" />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" />I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form>
    );
}
