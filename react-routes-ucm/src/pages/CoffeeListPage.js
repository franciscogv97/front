import React, { useEffect, useState } from 'react';
import { getCoffeeList } from '../services/api';
import './CoffeeListPageStyle.css';

const CoffeeListPage = () => {
  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const data = await getCoffeeList();
        setCoffees(data);
      } catch (error) {
        setError('Error fetching coffee list');
      }
    };

    fetchCoffees();
  }, []);

  return (
    <div className="coffee-list-container">
      <input type="text" placeholder="Nombre Coffee" className="search-bar" />
      <div className="coffee-list">
        {error && <p className="error-message">{error}</p>}
        {coffees.map((coffee, index) => (
          <div key={index} className="coffee-item">
            <img src={`data:image/png;base64,${coffee.image64}`} alt={`Coffee ${index + 1}`} className="coffee-image" />
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
            <p className="coffee-price">${coffee.price}</p>
            <button className="opinions-button">Opiniones</button>
          </div>
        ))}
      </div>
      <footer>
        <p>Chile, 2024</p>
      </footer>
    </div>
  );
};

export default CoffeeListPage;
