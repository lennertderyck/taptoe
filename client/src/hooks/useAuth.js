import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

const useAuth = () => {
    const { credentials, login, logout, loading, user } = useContext(authContext);
    return { credentials, login, logout, loading, user };
}

export default useAuth;