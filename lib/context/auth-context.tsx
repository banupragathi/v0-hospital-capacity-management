"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { User, UserRole } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false }
    case "LOGOUT":
      return { ...initialState }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

interface AuthContextType {
  state: AuthState
  loginWithPhone: (phone: string) => Promise<boolean>
  loginWithCredentials: (username: string, password: string) => Promise<boolean>
  loginAsRole: (role: UserRole) => void
  logout: () => void
  register: (name: string, phone: string, role: UserRole) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const loginWithPhone = async (phone: string): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })
    await new Promise((r) => setTimeout(r, 800))
    const user = mockUsers.find((u) => u.phone === phone)
    if (user) {
      dispatch({ type: "LOGIN", payload: user })
      return true
    }
    dispatch({ type: "SET_LOADING", payload: false })
    return false
  }

  const loginWithCredentials = async (username: string, _password: string): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })
    await new Promise((r) => setTimeout(r, 800))
    const user = mockUsers.find((u) => u.email === username || u.name.toLowerCase() === username.toLowerCase())
    if (user) {
      dispatch({ type: "LOGIN", payload: user })
      return true
    }
    dispatch({ type: "SET_LOADING", payload: false })
    return false
  }

  const loginAsRole = (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role)
    if (user) {
      dispatch({ type: "LOGIN", payload: user })
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const register = async (name: string, phone: string, role: UserRole): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true })
    await new Promise((r) => setTimeout(r, 800))
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      phone,
      role,
    }
    dispatch({ type: "LOGIN", payload: newUser })
    return true
  }

  return (
    <AuthContext.Provider value={{ state, loginWithPhone, loginWithCredentials, loginAsRole, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
