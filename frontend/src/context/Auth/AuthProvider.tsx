import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import useApi from "../../hooks/useApi";
import { ICliente, IFreteiro } from "../../interfaces";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IFreteiro | ICliente | null>(null);
  const [typeUser, setTypeUser] = useState<number>(0);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const client = useQueryClient();
  const api = useApi();

  const signin = async (email: string, password: string) => {
    setIsLoadingUser(true);
    const data = await api.signin(email, password);

    if (data.data.user && data.data.token) {
      setToken(data.data.token);
      data.data.user.id === data.data.user.extra_data.freteiro
        ? api.getFreteiro(data.data.user.id).then((res) => {
            setUser(res.data);
            setTypeUser(1);
          })
        : api.getCliente(data.data.user.id).then((res) => {
            setUser(res.data);
            setTypeUser(2);
          });
      setIsLoadingUser(false);
      return data.data.user.id === data.data.user.extra_data.freteiro;
    }
    return null;
  };

  const validateToken = async () => {
    const storageToken = localStorage.getItem("authToken");
    if (storageToken) {
      const userData = await api.validateToken(storageToken);
      if (userData.data.user) {
        userData.data.user.id === userData.data.user.extra_data.freteiro
          ? api.getFreteiro(userData.data.user.id).then((res) => {
              setUser(res.data);
              setTypeUser(1);
            })
          : api.getCliente(userData.data.user.id).then((res) => {
              setUser(res.data);
              setTypeUser(2);
            });
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const signout = () => {
    client.clear();
    api.logout();
    setToken("");
    setUser(null);
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider
      value={{ user, typeUser, isLoadingUser, signin, signout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
