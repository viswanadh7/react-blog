import { useContext, useState } from "react";
import { createContext } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const login = (sessionUser) => {
        // console.log('Before setItem', user)
        sessionStorage.setItem('user', JSON.stringify(sessionUser))
        setUser(JSON.parse(sessionStorage.getItem('user')))
        // console.log('After setItem', user)
    };
    const logout = () => {
        sessionStorage.clear()
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
