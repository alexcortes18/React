import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch("http://localhost:3000/meals");
            if (!response.ok) {
                //...
            }
            const meals = await response.json(); // to convert the incoming json from the backend into JS.
            setLoadedMeals(meals);
        }
        fetchMeals();
    }, []);

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