import React, { useEffect, useState } from 'react';
import { getUsers, lockUser, unlockUser } from '../services/api';
import './ManageClientsPageStyle.css';

const ManageClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getUsers();
        console.log('Usuarios obtenidos:', data); // Verificar los datos obtenidos
        // Filtrar solo los clientes con el rol "cliente"
        const clientData = data.filter(user => user.role.includes('CLIENT'));
        console.log('Clientes filtrados:', clientData); // Verificar los datos filtrados
        setClients(clientData);
      } catch (error) {
        setError('Error fetching client list');
        console.error(error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client) => {
    setEditClient(client);
  };

  const handleLockUnlock = async () => {
    try {
      if (editClient.locked) {
        await unlockUser(editClient.username);
        setClients(clients.map(client => (client.username === editClient.username ? { ...editClient, locked: false } : client)));
        alert('Client unlocked successfully');
      } else {
        await lockUser(editClient.username);
        setClients(clients.map(client => (client.username === editClient.username ? { ...editClient, locked: true } : client)));
        alert('Client locked successfully');
      }
      setEditClient(null);
    } catch (error) {
      alert('Error updating client lock status');
      console.error(error);
    }
  };

  return (
    <div className="manage-clients-container">
      <h1>Clientes</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="clients-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Disable</th>
            <th>Locked</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.username}</td>
              <td>{client.email}</td>
              <td>{client.disable ? 'yes' : 'no'}</td>
              <td>{client.locked ? 'yes' : 'no'}</td>
              <td><button onClick={() => handleEdit(client)}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {editClient && (
        <div className="edit-form">
          <h2>{editClient.locked ? 'Desbloquear Cliente' : 'Bloquear Cliente'}</h2>
          <button onClick={handleLockUnlock}>
            {editClient.locked ? 'Desbloquear' : 'Bloquear'}
          </button>
          <button onClick={() => setEditClient(null)}>Cancelar</button>
        </div>
      )}
      <footer>
        <p>Chile, 2024</p>
      </footer>
    </div>
  );
};

export default ManageClientsPage;