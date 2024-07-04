import React, { useEffect, useState } from 'react';
import { getUsers, updateUser } from '../services/api';
import './ManageClientsPageStyle.css';

const ManageClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getUsers();
        // Filtrar solo los clientes con el rol "CLIENT"
        const clientData = data.filter(user => user.roles.includes('CLIENT'));
        setClients(clientData);
      } catch (error) {
        setError('Error fetching client list');
      }
    };

    fetchClients();
  }, []);

  const handleEdit = async (client) => {
    try {
      await updateUser(client);
      alert('Client updated successfully');
    } catch (error) {
      alert('Error updating client');
    }
  };

  return (
    <div className="manage-clients-container">
      <h1>Clientes</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="clients-table">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>disable</th>
            <th>locked</th>
            <th>acción</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.username}</td>
              <td>{client.email}</td>
              <td>{client.disable ? 'yes' : 'no'}</td>
              <td>{client.locked ? 'yes' : 'no'}</td>
              <td><button onClick={() => handleEdit(client)}>editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <p>Chile, 2024</p>
      </footer>
    </div>
  );
};

export default ManageClientsPage;
