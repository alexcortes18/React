import { Link } from "react-router-dom"

export default function HomePage() {
    return <>
        <h1>My home page.</h1>
        <p>Go to <Link to="/products">The list of products</Link></p>
        {/* <Link> helps us to change the URL or path without sending a new HTTP request if we 
        were using <a></a> instead.*/}
    </>

}