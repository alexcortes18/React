
export default function Input({ label, id, error, ...props }) {
    return (
        <div className="control no-margin">
            <label htmlFor={id}>{label}</label>
            <input
                id= {id}
                // type="email"
                // name="email"
                // value={enteredValues.email}
                // onChange={(event) => handleInputChange("email", event.target.value)}
                // onBlur={() => handleInputBlur("email")}
                {...props}
            />
            <div className="control-error">{error}</div>
        </div>
    )
}