import React from 'react';
import data from './data';
import logo from './logo.jpeg';

function App() {
  return (
    <div>
      <Header />
      <header>
        <a href="/">Caffeine Confessions!!! </a>
      </header>
      <main>
        <h1>Featured products</h1>
        <div className="products">
          {data.products.map((products) => (
            <div className="product" key={products.slug}>
              <a href={`/product/${products.slug}`}>
                <img src={products.image} alt={products.name} />
              </a>
              <div className="product-info">
                <a href={`/product/${products.slug}`}>
                  <p>{products.name}</p>
                </a>
                <p>
                  <strong>${products.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Header() {
  return <img src={logo} width="220px" height="180px" alt="Logo" />;
}
export default App;
