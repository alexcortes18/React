export default function Input({label, id, ...props}){
    return <p className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required {...props}/>
        {/* name -> to use for Form submission
            id -> use for browser for some things like focus, voice speech for the hearing impaired... not too necessary.
         */}
    </p>
}