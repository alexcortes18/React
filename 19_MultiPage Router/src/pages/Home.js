import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
    const navigate = useNavigate();

    function navigateHandler(){
        navigate('/products');
    }

    return <>
        <h1>My home page.</h1>
        <p>Go to <Link to="/products">The list of products</Link></p>
        {/* <Link> helps us to change the URL or path without sending a new HTTP request if we 
        were using <a></a> instead.*/}
        <p>
            <button onClick={navigateHandler}>Navigate</button> 
            {/* This navigate inside the button is just to show that we can use navigation programmatically with
             useNavigate(). Do not use it with buttons... */}
        </p>
    </>

}