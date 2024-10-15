import { Link, useParams } from 'react-router-dom';

function ProductDetailsPage() {
    const params = useParams(); // contains every dynamic path segment we define in our route definition as
    // a property. In our case: "productId"

    return (
        <>
            <h1>Product Details!</h1>
            <p>{params.productId}</p>
            <p><Link to={".."} relative='path'>Back</Link></p> 
            {/* ".." special command to go back one time, BUT it is resolve relative to the path definitions, and
            since ProductDetailPage is a direct children of the "/root" path, then we are sent to the Home page.
            We can change this with the 'relative' prop. Default is "route" which is the definition we set already,
            but we can set it to "path", React Router will look at the current path, and simply remove 1 segment.*/}
        </>
    );
}

export default ProductDetailsPage;