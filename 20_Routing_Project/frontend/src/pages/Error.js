import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();


    return (
        <>
            <h1>An error ocurred!</h1>
            <h2>Displaying error from the loader function: {error.message}</h2>
        </>
    );
}