import React from 'react';
import logo from './logo.jpeg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <header>
          <Link to="/">Caffeine Confessions!!! </Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  return <img src={logo} width="220px" height="180px" alt="Logo" />;
}
export default App;
