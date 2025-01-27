import React, { useState, useMemo, useCallback, Suspense, lazy } from "react";
import "./App.css";

// Lazy-loaded About component
const About = lazy(() => import("./About"));

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const fakeProductsAPI = [
    { id: 1, name: "Apple iPhone 15", price: 59999, image: "https://www.phonemart.ng/wp-content/uploads/2024/06/15p1.jpeg" },
    { id: 2, name: "Samsung Galaxy S21", price: 49999, image: "https://www.dealsplant.com/cdn/shop/products/817wzcDRQAL._SL1500.jpg?v=1643721719" },
    { id: 3, name: "Google Pixel 6", price: 42999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36Tqaq_eiKhZrgZ72M5VdbMz7Pe7f3F0n7g&s" },
    { id: 4, name: "OnePlus 9", price: 53999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQglPalTzjD4Oai7MQKvvo0PCr1DVMdduEJGw&s" },
    { id: 5, name: "Xiaomi Mi 11", price: 46999, image: "https://m.media-amazon.com/images/I/51PqS91h+cL.jpg" },
    { id: 6, name: "Sony Xperia 5", price: 54999, image: "https://www.mytrendyphone.fi/images/Sony-Xperia-5-IV-128GB-White-4589771647493-20032023-01-p.webp" },
    { id: 7, name: "Huawei P40 Pro", price: 62999, image: "https://m.media-amazon.com/images/I/51D5aXUDRSL.jpg" },
  ];

  const filteredProducts = useMemo(() => {
    return fakeProductsAPI.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const addToCart = product => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = productId => {
    setCart(prevCart => prevCart.filter(product => product.id !== productId));
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(prevState => !prevState);
  };

  return (
    <div className="app">
      <h1>InstaFind</h1>

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

      {/* Product Count */}
      <div className="product-count">
        <p>Found {filteredProducts.length} product(s)</p>
      </div>

      {/* Product List */}
      <Suspense fallback={<p>Loading products...</p>}>
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>₹{product.price.toLocaleString()}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </Suspense>

      {/* Cart Button */}
      <button className="cart-button" onClick={toggleCartVisibility}>
        Cart ({cart.length})
      </button>

      {/* About Button */}
      <button className="about-button" onClick={() => setShowAbout(prev => !prev)}>
        {showAbout ? "Hide About" : "Show About"}
      </button>

      {/* Cart Modal */}
      {isCartVisible && (
        <Suspense fallback={<p>Loading cart...</p>}>
          <div className="cart-modal">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-image" />
                    <div className="cart-info">
                      <p>{item.name}</p>
                      <p>₹{item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <button className="close-cart" onClick={toggleCartVisibility}>Close</button>
          </div>
        </Suspense>
      )}

      {/* About Section */}
      {showAbout && (
        <Suspense fallback={<p>Loading about section...</p>}>
          <About />
        </Suspense>
      )}
    </div>
  );
}

export default App;



