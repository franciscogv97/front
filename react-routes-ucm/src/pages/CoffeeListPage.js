import React, { useEffect, useState } from 'react';
import { getCoffeeList, getTestimonialsByCoffeeId, createTestimonial } from '../services/api';
import './CoffeeListPageStyle.css';
import { useAuth } from '../auth/AuthContext';

const CoffeeListPage = () => {
  const { auth } = useAuth();
  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);
  const [testimonials, setTestimonials] = useState({});
  const [newTestimonial, setNewTestimonial] = useState('');
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);

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

  const fetchTestimonials = async (coffeeId) => {
    try {
      setSelectedCoffeeId(coffeeId);
      const data = await getTestimonialsByCoffeeId(coffeeId);
      setTestimonials((prev) => ({ ...prev, [coffeeId]: data }));
    } catch (error) {
      setError('Error fetching testimonials');
    }
  };

  const handleCreateTestimonial = async (coffeeId) => {
    try {
      await createTestimonial({
        idCoffee: coffeeId,
        testimonial: newTestimonial,
        username: 'cliente' // Cambiar esto según el usuario actual
      });
      fetchTestimonials(coffeeId);
      setNewTestimonial('');
    } catch (error) {
      setError('Error creating testimonial');
    }
  };

  return (
    <div className="coffee-list-container">
      <div className="coffee-list">
        {error && <p className="error-message">{error}</p>}
        {coffees.map((coffee, index) => (
          <div key={index} className="coffee-item">
            <img src={`data:image/png;base64,${coffee.image64}`} alt={`Coffee ${index + 1}`} className="coffee-image" />
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
            <p className="coffee-price">${coffee.price}</p>
            {auth.token && (
              <>
                <button className="opinions-button" onClick={() => fetchTestimonials(coffee.idCoffee)}>Opiniones</button>
                {selectedCoffeeId === coffee.idCoffee && (
                  <div className="testimonials">
                    {testimonials[coffee.idCoffee]?.map((testimonial, index) => (
                      <p key={index}>{testimonial.testimonial}</p>
                    ))}
                    <input
                      type="text"
                      value={newTestimonial}
                      onChange={(e) => setNewTestimonial(e.target.value)}
                      placeholder="Escribe tu opinión"
                    />
                    <button onClick={() => handleCreateTestimonial(coffee.idCoffee)}>Agregar Opinión</button>
                  </div>
                )}
              </>
            )}
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
