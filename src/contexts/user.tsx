import React from "react";

interface UserProviderProps {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

import { UserProps } from "@/config/interfaces";

export const UserContext = React.createContext({} as UserProviderProps);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProps>({} as UserProps);

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
