import React, { useEffect, useState } from 'react';
import { getCoffeeList, deleteCoffee, updateCoffee, createCoffee } from '../services/api';
import './ManageCoffeePageStyle.css';

const ManageCoffeePage = () => {
  const [coffees, setCoffees] = useState([]);
  const [error, setError] = useState(null);
  const [editCoffee, setEditCoffee] = useState(null);
  const [newCoffee, setNewCoffee] = useState({
    name: '',
    description: '',
    price: '',
    image64: ''
  });

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const data = await getCoffeeList();
        console.log(data); // Verificar los datos aquí
        setCoffees(data);
      } catch (error) {
        setError('Error fetching coffee list');
      }
    };

    fetchCoffees();
  }, []);

  const handleDelete = async (idCoffee) => {
    try {
      console.log(`Deleting coffee with ID: ${idCoffee}`);
      await deleteCoffee(idCoffee);
      setCoffees(coffees.filter(coffee => coffee.idCoffee !== idCoffee));
    } catch (error) {
      setError('Error deleting coffee');
    }
  };

  const handleEdit = (coffee) => {
    console.log('Editing coffee:', coffee);
    setEditCoffee(coffee);
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating coffee:', editCoffee);
      const updatedCoffee = await updateCoffee(editCoffee);
      setCoffees(coffees.map(coffee => (coffee.idCoffee === updatedCoffee.idCoffee ? updatedCoffee : coffee)));
      setEditCoffee(null);
    } catch (error) {
      setError('Error updating coffee');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCoffee({ ...editCoffee, [name]: value });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewCoffee({ ...newCoffee, [name]: value });
  };

  const handleCreate = async () => {
    try {
      console.log('Creating new coffee:', newCoffee);
      const createdCoffee = await createCoffee(newCoffee);
      setCoffees([...coffees, createdCoffee]);
      setNewCoffee({
        name: '',
        description: '',
        price: '',
        image64: ''
      });
    } catch (error) {
      setError('Error creating coffee');
    }
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setNewCoffee({ ...newCoffee, image64: reader.result.split(',')[1] });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="manage-coffee-container">
      <h1>Gestión de Cafés</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="main-content">
        <div className="form-container">
          <div className="create-form">
            <h2>Nuevo Café</h2>
            <input
              type="text"
              name="name"
              value={newCoffee.name}
              onChange={handleCreateChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="description"
              value={newCoffee.description}
              onChange={handleCreateChange}
              placeholder="Descripción"
            />
            <input
              type="number"
              name="price"
              value={newCoffee.price}
              onChange={handleCreateChange}
              placeholder="Precio"
            />
            <input
              type="file"
              name="image64"
              onChange={handleImageUpload}
              placeholder="Foto"
            />
            <button onClick={handleCreate}>Crear</button>
          </div>
          {editCoffee && (
            <div className="edit-form">
              <h2>Editar Café</h2>
              <input
                type="text"
                name="name"
                value={editCoffee.name}
                onChange={handleChange}
                placeholder="Nombre"
              />
              <input
                type="text"
                name="description"
                value={editCoffee.description}
                onChange={handleChange}
                placeholder="Descripción"
              />
              <input
                type="number"
                name="price"
                value={editCoffee.price}
                onChange={handleChange}
                placeholder="Precio"
              />
              <button onClick={handleUpdate}>Guardar</button>
              <button onClick={() => setEditCoffee(null)}>Cancelar</button>
            </div>
          )}
        </div>
        <div className="table-container">
          <table className="coffee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {coffees.map((coffee, index) => (
                <tr key={index}>
                  <td>{coffee.idCoffee}</td> {}
                  <td>{coffee.name}</td>
                  <td>{coffee.description}</td>
                  <td>${coffee.price}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(coffee)}>Editar</button>
                    <button className="delete-button" onClick={() => handleDelete(coffee.idCoffee)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer>
        <p>Chile, 2024</p>
      </footer>
    </div>
  );
};

export default ManageCoffeePage;
