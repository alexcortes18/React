import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/Products';
import ProductDetail from './pages/ProductDetail';

test('renders Products page', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );

  // Test para ver si Products Page ha sido renderizada.
  expect(screen.getByText('The Products Page.')).toBeInTheDocument();
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
  expect(screen.getByText('Product 3')).toBeInTheDocument();

  expect(screen.getByText('Product 1').closest('a')).toHaveAttribute('href', '/p1');
  expect(screen.getByText('Product 2').closest('a')).toHaveAttribute('href', '/p2');
  expect(screen.getByText('Product 3').closest('a')).toHaveAttribute('href', '/p3');
});

test('Renderiza la página ProductDetail con productID', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText('Product 1'));
  expect(screen.getByText('Product Details!')).toBeInTheDocument();
  expect(screen.getByText('p1')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Back'));
  expect(screen.getByText('The Products Page.')).toBeInTheDocument();
});

test('Navega a la correcta páginas de Product Deatils', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText('Product 1'));
  expect(screen.getByText('p1')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Back'));
  fireEvent.click(screen.getByText('Product 2'));
  expect(screen.getByText('p2')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Back'));
  fireEvent.click(screen.getByText('Product 3'));
  expect(screen.getByText('p3')).toBeInTheDocument();
});


// ----------------------------------------------------- MODEL 1 -----------------------------------------------------
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
// import ProductsPage from './pages/Products';
// import ProductDetail from './pages/ProductDetail';

// test('renders products page title', () => {
//   render(<ProductsPage />);
//   expect(screen.getByText('The Products Page.')).toBeInTheDocument();
// });

// test('renders all products with correct links', () => {
//   render(<ProductsPage />);
//   PRODUCTS.forEach(product => {
//     const linkElement = screen.getByText(product.title);
//     expect(linkElement).toBeInTheDocument();
//     expect(linkElement.closest('a')).toHaveAttribute('href', `/${product.id}`);
//   });
// });

// test('renders product details with correct productId', () => {
//   const productId = 'p1';
//   render(
//     <MemoryRouter initialEntries={[`/${productId}`]}>
//       <ProductDetailsPage />
//     </MemoryRouter>
//   );
//   expect(screen.getByText('Product Details!')).toBeInTheDocument();
//   expect(screen.getByText(productId)).toBeInTheDocument();
// });

// test('renders back link', () => {
//   render(
//     <MemoryRouter initialEntries={['/p1']}>
//       <ProductDetailsPage />
//     </MemoryRouter>
//   );
//   const backLink = screen.getByText('Back');
//   expect(backLink).toBeInTheDocument();
//   expect(backLink.closest('a')).toHaveAttribute('href', '..');
// });

// test('navigates from products page to product details page', () => {
//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <Routes>
//         <Route path="/" element={<ProductsPage />} />
//         <Route path="/:productId" element={<ProductDetailsPage />} />
//       </Routes>
//     </MemoryRouter>
//   );

//   fireEvent.click(screen.getByText('Product 1'));
//   expect(screen.getByText('Product Details!')).toBeInTheDocument();
//   expect(screen.getByText('p1')).toBeInTheDocument();
// });


// ----------------------------------------------------- MODEL 2 -----------------------------------------------------
// Tests for Productos.js
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import ProductsPage from './pages/Products';
// import ProductDetailsPage from './pages/ProductDetail';

// test('renders product page header', () => {
//   render(<ProductsPage />, { wrapper: MemoryRouter });
//   const headerElement = screen.getByText(/The Products Page./i);
//   expect(headerElement).toBeInTheDocument();
// });

// test('renders all product links', () => {
//   render(<ProductsPage />, { wrapper: MemoryRouter });
//   const products = [
//     { id: 'p1', title: 'Product 1' },
//     { id: 'p2', title: 'Product 2' },
//     { id: 'p3', title: 'Product 3' }
//   ];

//   products.forEach((product) => {
//     const linkElement = screen.getByText(product.title);
//     expect(linkElement).toBeInTheDocument();
//     expect(linkElement.closest('a')).toHaveAttribute('href', product.id);
//   });
// });

// // Test for ProductDetailsPage.js

// test('renders product details header', () => {
//   render(
//     <MemoryRouter initialEntries={['/p1']}>
//       <Routes>
//         <Route path=":productId" element={<ProductDetailsPage />} />
//       </Routes>
//     </MemoryRouter>
//   );
//   const headerElement = screen.getByText(/Product Details!/i);
//   expect(headerElement).toBeInTheDocument();
// });

// test('displays the correct productId', () => {
//   render(
//     <MemoryRouter initialEntries={['/p2']}>
//       <Routes>
//         <Route path=":productId" element={<ProductDetailsPage />} />
//       </Routes>
//     </MemoryRouter>
//   );
//   const idElement = screen.getByText(/p2/i);
//   expect(idElement).toBeInTheDocument();
// });

// test('renders back link', () => {
//   render(
//     <MemoryRouter initialEntries={['/product/p1']}>
//       <Routes>
//         <Route path=":productId" element={<ProductDetailsPage />} />
//       </Routes>
//     </MemoryRouter>
//   );
//   const backLink = screen.getByText(/back/i);
//   expect(backLink).toBeInTheDocument();
// });