import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';
//import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  //const [products, setProducts] = useState([]);
  // returns an array that contains a variable products and a function setProducts
  // to update the variable product.
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const instance = axios.create({ baseURL: 'http://localhost:5000' });
        const result = await instance.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {/* {products.map((products) => (
          <div className="product" key={products.slug}>
            <Link to={`/product/${products.slug}`}>
              <img src={products.image} alt={products.name} />
            </Link>
            <div className="product-info"> */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((products) => (
            <div className="product" key={products.slug}>
              <Link to={`/product/${products.slug}`}>
                <img src={products.image} alt={products.name} />
              </Link>
              {/* <p>
                <strong>${products.price}</strong>
              </p>
              <button>Add to Cart</button> */}
              <div className="product-info">
                <Link to={`/product/${products.slug}`}>
                  <p>{products.name}</p>
                </Link>
                <p>
                  <strong>${products.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
