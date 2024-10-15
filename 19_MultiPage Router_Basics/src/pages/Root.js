import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation";


export default function RootLayout() {
    return (
        <>
            <MainNavigation></MainNavigation>
            <main>
                <Outlet></Outlet> 
                {/* This Outlet component is needed to render child routes. */}
            </main>

        </>
    )
}