import React, { useState, useMemo, useCallback } from 'react';
import './App.css';

const fakeProductsAPI = [
  { id: 1, name: 'Apple iPhone 15', price: 59999, image: 'https://www.phonemart.ng/wp-content/uploads/2024/06/15p1.jpeg' },
  { id: 2, name: 'Samsung Galaxy S21', price: 49999, image: 'https://www.dealsplant.com/cdn/shop/products/817wzcDRQAL._SL1500.jpg?v=1643721719' },
  { id: 3, name: 'Google Pixel 6', price: 42999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36Tqaq_eiKhZrgZ72M5VdbMz7Pe7f3F0n7g&s' },
  { id: 4, name: 'OnePlus 9', price: 53999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglPalTzjD4Oai7MQKvvo0PCr1DVMdduEJGw&s' },
  { id: 5, name: 'Xiaomi Mi 11', price: 46999, image: 'https://m.media-amazon.com/images/I/51PqS91h+cL.jpg' },
  { id: 6, name: 'Sony Xperia 5', price: 54999, image: 'https://www.mytrendyphone.fi/images/Sony-Xperia-5-IV-128GB-White-4589771647493-20032023-01-p.webp' },
  { id: 7, name: 'Huawei P40 Pro', price: 62999, image: 'https://m.media-amazon.com/images/I/51D5aXUDRSL.jpg' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return fakeProductsAPI.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(product => product.id !== productId));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="app">
      <h1>InstaFind</h1>
      
      {/* Cart Button */}
      <button className="cart-button" onClick={toggleCart}>
        Cart ({cart.length})
      </button>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a product"
        />
        <button onClick={clearSearch}>Clear Search</button>
      </div>
      
      <div className="product-count">
        <p>Found {filteredProducts.length} product(s)</p>
      </div>
      
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString()}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="cart-modal">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button onClick={toggleCart} className="close-cart">Close Cart</button>
        </div>
      )}
    </div>
  );
}

export default App;
