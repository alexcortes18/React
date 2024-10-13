// import { Link } from "react-router-dom"; // we will use NavLink instead
import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css'

export default function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            // className is not the normal className for css, but in this case, rather a special prop
                            // for Navlink that takes a function that returns a class name that should be returned to
                            // the anchor <a> tag. It also provides us with an object, which we can destructure to get
                            // the property isActive (provided by React Router Dom) and acts like a boolean if its
                            // active.
                            end // Not needed anymore, but for previous versions is to tell React Router Dom, that the path
                        // "/" is the end of this Navlink and only consider "isActive" if it ends ONLY with "/". Before
                        // this it would consider /, and /products because "/" is also present in "/products". (Of course
                        // if we had a NavLink in /products.)
                        >Home</NavLink>

                    </li>
                    <li>
                        <NavLink to="/products"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}