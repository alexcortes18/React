import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.js";

export default function RootLayout() {
    // const navigation = useNavigation(); // hook provided by React Router that let's us know if we are currently
    // in an active transition, if we are loading data, or we have no active transition going on.

    // The loading indicator won't be added on the page which you're transitioning to, but instead on 
    // some page, or a component, which is already visible on the screen when the transition is started.

    // navigation.state can be either => 'idle', 'loading', 'submitting'
    

    return (
        <>
            <MainNavigation></MainNavigation>
            <main>
                {/* {navigation.state==='loading' && <p>Loading...</p>} */}
                <Outlet></Outlet>
            </main>
        </>
    );
}