import React, { createContext, useState } from 'react'
import { User } from '../../models/user'
export interface AuthProviderType {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
export const AuthProviderContext = createContext<AuthProviderType>(
  {} as AuthProviderType
)
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>()

  return (
    <AuthProviderContext.Provider value={{ user, setUser }}>
      {children}
    </AuthProviderContext.Provider>
  )
}
