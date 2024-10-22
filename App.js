import { useEffect } from 'react'
import { Main } from './Main'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite'
import { useTasks } from './utils/task'
import { TasksProvider } from './context/Task'

export default function App() {
  const { createTable, restarTable } = useTasks()

  useEffect(() => {
    createTable()
  }, [])

  return (
    <SafeAreaProvider>
      <TasksProvider>
        <SQLiteProvider
          databaseName="TODO.db"
          assetSource={{ assetId: require('./db/TODO.db') }}
        >
          <Main />
        </SQLiteProvider>
      </TasksProvider>
    </SafeAreaProvider>
  )
}
