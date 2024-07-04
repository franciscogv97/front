import {jwtDecode} from "jwt-decode";
export async function getUsers() {
    try {
        const res = await fetch("http://localhost:8085/api/users");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Usuarios obtenidos:', data); // Agregar un log para verificar los datos
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function loginAccount(login) {
    try {
        const res = await fetch("http://localhost:8085/api/auth/login", {
            method: "POST",
            body: JSON.stringify(login), // Convertir objeto a cadena JSON
            headers: {
                "Content-Type": "application/json" // Corregir el encabezado
            }
        });

        // Verifica si la respuesta es exitosa
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        if (data.token) {
            // Decodificar el token para obtener el rol del usuario
            const decodedToken = jwtDecode(data.token);
            console.log('Decoded Token:', decodedToken);

            // Almacenar el token en el almacenamiento local o en el estado
            localStorage.setItem('token', data.token);

            return decodedToken;
        } else {
            throw new Error('No token found in response');
        }
    } catch (error) {
        console.log('Error during login:', error);
        return null;
    }
}

export async function registerAccount(register) {
    try {
        const res = await fetch("http://localhost:8085/api/auth/create", {
            method: "POST",
            body: JSON.stringify(register), // Convertir objeto a cadena JSON
            headers: {
                "Content-Type": "application/json" // Corregir el encabezado
            }
        });

        // Verifica si la respuesta es exitosa
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.log('Error during registration:', error);
        return null;
    }
}

export async function getCoffeeList() {
    try {
        const res = await fetch("http://localhost:8085/api/coffee/list");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching coffee list:', error);
        return [];
    }
}

export async function logoutAccount() {
    try {
        const res = await fetch("http://localhost:8085/api/auth/logout", {
            method: "POST",
            credentials: "include" // Esto asegura que las cookies se incluyan con la solicitud
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        localStorage.removeItem('token'); // Remove token from local storage
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}

export async function updateUser(user) {
    try {
        const res = await fetch("http://localhost:8085/api/auth/update", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}


export async function deleteCoffee(idCoffee) {
    try {
      const res = await fetch(`http://localhost:8085/api/coffee/deleteCoffee/${idCoffee}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error('Error deleting coffee:', error);
      throw error;
    }
  }
  
  export async function updateCoffee(coffee) {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const res = await fetch('http://localhost:8085/api/coffee/updateCoffee', {
        method: 'PUT',
        body: JSON.stringify(coffee),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluir el token en los encabezados si es necesario
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error('Error updating coffee:', error);
      throw error;
    }
  }
  