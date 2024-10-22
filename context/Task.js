import { createContext, useContext } from 'react'
import { useTasks as useTasksHook } from '../utils/task'

const TasksContext = createContext()

export function TasksProvider({ children }) {
  const tasksContextValue = useTasksHook()

  return (
    <TasksContext.Provider value={tasksContextValue}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  return useContext(TasksContext) // Para usarlo en cualquier componente
}
