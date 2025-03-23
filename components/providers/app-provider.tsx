"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  mbtiType: string
  chronotype: string
  occupation: string
  interests: string[]
}

type Goal = {
  id: string
  title: string
  description?: string
  type: "short-term" | "long-term" | "ongoing"
  deadline?: string
}

type Task = {
  id: string
  title: string
  description?: string
  duration: number
  timeWindow: string
  priority: "high" | "medium" | "low"
  isFixed: boolean
}

type Routine = {
  id: string
  date: string
  timeBlocks: {
    title: string
    tasks: {
      id: string
      title: string
      time: string
      duration: number
      priority: "high" | "medium" | "low"
      isFixed: boolean
      status: "pending" | "completed" | "skipped" | "in-progress"
    }[]
  }[]
}

type AppContextType = {
  user: User | null
  setUser: (user: User | null) => void
  goals: Goal[]
  setGoals: (goals: Goal[]) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  routines: Routine[]
  setRoutines: (routines: Routine[]) => void
  currentRoutine: Routine | null
  setCurrentRoutine: (routine: Routine | null) => void
  isOnboarded: boolean
  setIsOnboarded: (isOnboarded: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [routines, setRoutines] = useState<Routine[]>([])
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null)
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false)

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        goals,
        setGoals,
        tasks,
        setTasks,
        routines,
        setRoutines,
        currentRoutine,
        setCurrentRoutine,
        isOnboarded,
        setIsOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

