import {jwtDecode} from 'jwt-decode';

export async function getUsers() {
    try {
        const token = localStorage.getItem('token'); 
        const res = await fetch("http://localhost:8085/api/auth/clientes", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Usuarios obtenidos:', data);
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
            body: JSON.stringify(login), 
            headers: {
                "Content-Type": "application/json" 
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        if (data.token) {
        
            const decodedToken = jwtDecode(data.token);
            console.log('Decoded Token:', decodedToken);
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
            body: JSON.stringify(register), 
            headers: {
                "Content-Type": "application/json" 
            }
        });

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
        const res = await fetch("http://localhost:8085/api/coffee/list", {
            headers: {
                "Content-Type": "application/json",
             
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
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
            credentials: "include" 
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        localStorage.removeItem('token'); 
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
        const res = await fetch(`http://localhost:8085/api/coffee/deleteCoffee?id_coffee=${idCoffee}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        const token = localStorage.getItem('token'); 
        const res = await fetch('http://localhost:8085/api/coffee/updateCoffee', {
            method: 'PUT',
            body: JSON.stringify(coffee),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
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

export async function createCoffee(coffee) {
    try {
        const token = localStorage.getItem('token'); 
        const res = await fetch('http://localhost:8085/api/coffee/coffees', {
            method: 'POST',
            body: JSON.stringify(coffee),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error creating coffee:', error);
        throw error;
    }
}

export async function lockUser(username) {
    try {
        const token = localStorage.getItem('token'); 
        const res = await fetch(`http://localhost:8085/api/auth/lock?username=${username}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        
        const responseText = await res.text();
        try {
            return JSON.parse(responseText); 
        } catch (e) {
            return responseText; 
        }
    } catch (error) {
        console.error('Error locking user:', error);
        throw error;
    }
}

export async function unlockUser(username) {
    try {
        const token = localStorage.getItem('token'); 
        const res = await fetch(`http://localhost:8085/api/auth/unlock?username=${username}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const responseText = await res.text();
        try {
            return JSON.parse(responseText); 
        } catch (e) {
            return responseText; 
        }
    } catch (error) {
        console.error('Error unlocking user:', error);
        throw error;
    }
}


