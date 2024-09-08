export default function UserInput({onChange, userInput}) {
    return <section id="user-input">
        <div className="input-group">
            <p>
                <label>Initial Investment</label>
                <input
                    type="number"
                    required
                    onChange={(event) => onChange("initialInvestment", event.target.value)} //event.target.value is always converted to String.
                    value={userInput.initialInvestment}
                />
            </p>
            <p>
                <label>Annual Investment</label>
                <input
                    type="number"
                    required
                    onChange={(event) => onChange("annualInvestment", event.target.value)}
                    value={userInput.annualInvestment}
                />
            </p>
        </div>
        <div className="input-group">
            <p>
                <label>Expected Return</label>
                <input
                    type="number"
                    required
                    onChange={(event) => onChange("expectedReturn", event.target.value)}
                    value={userInput.expectedReturn}
                />
            </p>
            <p>
                <label>Duration</label>
                <input
                    type="number"
                    required
                    onChange={(event) => onChange("duration", event.target.value)}
                    value={userInput.duration}
                />
            </p>
        </div>
    </section>
}