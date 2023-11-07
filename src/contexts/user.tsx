import React, { useEffect } from "react";

interface UserProviderProps {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

import { UserProps } from "@/config/interfaces";

export const UserContext = React.createContext({} as UserProviderProps);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProps>({} as UserProps);

  useEffect(() => {
    fetch("http://localhost:3333/users")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Erro ao chamar a API:", error);
      });

    console.log(user);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
