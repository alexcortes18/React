import { currencyFormatter } from "../util/formatting"

export default function MealItem({meal}) {
    return (
        <li className="meal-item">
            <article>
                <img 
                src={`http://localhost:3000/${meal.image}`} // Both methods are ok... maybe this is more correct, since
                // we can get them from the public folder that it is served to the front end via the app.js file.
                // src={`../../backend/public/${meal.image}`}  // this also works.
                alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <button>Add to Cart</button>
                </p>
            </article>
        </li>
    )
}

