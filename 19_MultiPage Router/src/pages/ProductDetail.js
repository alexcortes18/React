import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
    const params = useParams(); // contains every dynamic path segment we define in our route definition as
    // a property. In our case: "productId"

    return (
        <>
            <h1>Product Details!</h1>
            <p>{params.productId}</p>
        </>
    );
}

export default ProductDetailsPage;