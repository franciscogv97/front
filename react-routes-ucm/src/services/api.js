import {jwtDecode} from "jwt-decode";

export async function getUsers() {
    const res = await fetch("https://randomuser.me/api/?results=10");
    const data = await res.json();
    return data.results; // Asegúrate de devolver los resultados correctos
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
