import { Link } from 'react-router-dom';
import data from '../data';

function HomeScreen() {
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {data.products.map((products) => (
          <div className="product" key={products.slug}>
            <Link to={`/product/${products.slug}`}>
              <img src={products.image} alt={products.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${products.slug}`}>
                <p>{products.name}</p>
              </Link>
              <p>
                <strong>${products.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
