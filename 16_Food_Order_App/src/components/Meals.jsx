import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp.js";
import Error from "./Error";

const requestConfig = {}; 
// because if its inside the component, then it gets re-created everytime the component Meals runs again,
// which will happen we when get use the useHttp, and a loop is created.

export default function Meals() {
    // BEFORE:
    // const [loadedMeals, setLoadedMeals] = useState([]);
    // useEffect(() => {
    //     async function fetchMeals() {
    //         const response = await fetch("http://localhost:3000/meals");
    //         if (!response.ok) {
    //             //...
    //         }
    //         const meals = await response.json(); // to convert the incoming json from the backend into JS.
    //         setLoadedMeals(meals);
    //     }
    //     fetchMeals();
    // }, []);

    const {
        data: loadedMeals,
        isLoading,
        error
    } = useHttp("http://localhost:3000/meals", requestConfig, []); //[] -> to make the initial data not be undefined, just empty.

    if(isLoading){
        return <p className="center">Fetching meals...</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                // <li key={meal.id}>
                //     {meal.name}
                //     {/* <img src={`/${meal.img}`}/> */}
                // </li>
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    )
}