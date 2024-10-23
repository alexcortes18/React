import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "An error occured!";
    let message;

    if (error.status === 500) {
        // message = JSON.parse(error.data).message; //.data coming from the Response object.
        message = error.data.message; // we don't have to parse it if we use the json() function to return error.
    }

    if (error.status === 404) {
        title = ' Not found!';
        message = 'Could not find resource or page';
    }

    return (
        <>
        <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}