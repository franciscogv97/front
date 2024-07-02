import React from "react";


export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [auth, setAuth] = React.useState({token:null});

    React.useEffect(() => {
        const token = localStorage.getItem("token");
            if(token){
                setAuth({token:token})
            }   
    }, [])

    const setToken = async (token) =>{
        localStorage.setItem("token", token);
        setAuth({token:token});
    }

    const logout = ( ) =>{
        localStorage.removeItem("token");
        setAuth({token:null})
    }

    return <AuthContext.Provider value={{auth, setToken, logout}}>
        {children}
    </AuthContext.Provider>





}