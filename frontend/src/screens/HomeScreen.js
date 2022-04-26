import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
//import data from '../data';

async function callAction() {
  let result;
  await fetch('http://localhost:5000/api/products')
    .then((res) => {
      console.log('res', res);
      return res.json();
    })
    .then((data) => {
      result = data;
      console.log('data', data);
    });
  console.log('result', result);
  return result;
}

function HomeScreen() {
  const [products, setProducts] = useState([]);
  // returns an array that contains a variable products and a function setProducts
  // to update the variable product.
  useEffect(() => {
    const fetchData = async () => {
      const result = await callAction(); //ajax request sent to this address and put the result in result variable
      setProducts(result);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {products.map((products) => (
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
