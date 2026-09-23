import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "", description: "Produces oxygen at night, improving air quality." },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/50/chlorophytum-3530413_1280.jpg", cost: "", description: "Exceptional for filtering formaldehyde and xylene." },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2018/02/21/15/39/peace-lily-3170848_1280.jpg", cost: "", description: "Removes toxins and features elegant white blooms." },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/03/01/18/31/fern-4893753_1280.jpg", cost: "", description: "Adds lush green foliage and acts as a natural humidifier." },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/06/09/04/28/plant-5276702_1280.jpg", cost: "", description: "Features glossy leaves that absorb airborne pollutants." },
        { name: "Bamboo Palm", image: "https://cdn.pixabay.com/photo/2017/04/10/15/22/bamboo-2218972_1280.jpg", cost: "", description: "Brings a tropical feel and cleans indoor air efficiently." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/03/31/15/51/appalachian-2191515_1280.jpg", cost: "", description: "Calming scent that promotes relaxation and better sleep." },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/29/21/20/jasmine-2354964_1280.jpg", cost: "", description: "Sweet floral fragrance that freshens up living spaces." },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/10/11/40/rosemary-1658851_1280.jpg", cost: "", description: "Herbaceous fragrance with culinary benefits." },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/08/29/18/36/mint-1628581_1280.jpg", cost: "", description: "Invigorating fresh scent and easy to maintain." },
        { name: "Geranium", image: "https://cdn.pixabay.com/photo/2016/05/25/11/15/geranium-1414349_1280.jpg", cost: "", description: "Pleasantly scented leaves with vibrant clusters of flowers." },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/07/15/15/57/lemon-balm-4339460_1280.jpg", cost: "", description: "Subtle citrus aroma that revitalizes rooms." }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/04/09/11/02/zz-plant-6164219_1280.jpg", cost: "", description: "Thrives in low light and requires minimal watering." },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/19/22/house-plant-3818503_1280.jpg", cost: "", description: "Nearly impossible to kill and grows fast as a vine." },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/11/17/28/aloe-vera-3311394_1280.jpg", cost: "", description: "Succulent with soothing gel properties." },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2020/05/20/19/33/jade-plant-5198292_1280.jpg", cost: "", description: "Symbolizes good luck and stores water in its leaves." },
        { name: "Cactus", image: "https://cdn.pixabay.com/photo/2016/11/02/11/53/cactus-1790601_1280.jpg", cost: "", description: "Prefers sunny windowsills and very sparse watering." },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/29/13/44/cactus-1869345_1280.jpg", cost: "", description: "A gorgeous variety of hardy, compact desert plants." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#2c3e50', color: 'white', alignItems: 'center' }}>
        <div className="tag" onClick={onHomeClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="https://cdn.pixabay.com/photo/2016/03/17/20/02/plant-1263889_1280.png" alt="" style={{ width: '40px' }} />
          <div>
            <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
            <i style={{ fontSize: '12px' }}>Where Green Meets Serenity</i>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '18px' }}>
          <span onClick={onHomeClick} style={{ cursor: 'pointer' }}>Home</span>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer', position: 'relative' }}>
            🛒 Cart <span style={{ background: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>{totalCartQuantity}</span>
          </span>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '30px' }}>
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '10px', color: '#2c3e50' }}>{category.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                {category.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }} />
                    <h3>{plant.name}</h3>
                    <p style={{ fontWeight: 'bold', color: '#27ae60' }}>{plant.cost}</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>{plant.description}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{
                        background: addedToCart[plant.name] ? '#95a5a6' : '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
