import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react'

function conect() {
  return SQLite.openDatabaseSync('TODO.db')
}

function getUpdateTask({
  id,
  title,
  startDate,
  expirationDate,
  done,
  progress
}) {
  if ((id || title || startDate || expirationDate || done || progress) == null)
    return

  if (id == null) return

  let obj = { id, title, startDate, expirationDate, done, progress }
  obj = Object.fromEntries(
    Object.entries(obj).filter(([_, valor]) => valor != null)
  )

  const values = []
  let query = 'UPDATE tasks SET'
  Object.entries(obj).forEach(([key, _], i) => {
    if (key !== 'id') {
      query +=
        obj[key] != null
          ? ` ${key} = ? ${i === Object.entries(obj).length - 1 ? '' : ','}`
          : ''
      if (obj[key] != null) {
        values.push(obj[key])
      }
    }
  })

  values.push(obj.id)
  query += ' WHERE id = ?'
  return { query, values }
}

export function useTasks() {
  const [tasks, setTasks] = useState([])

  function createTable() {
    const db = conect()
    const res = db.execSync(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT false,
        expirationDate TEXT,
        startDate TEXT,
        progress REAL
      )`)
  }

  function deleteTable() {
    const db = conect()
    db.execSync(`DROP TABLE IF EXISTS tasks`)
  }

  function getTasks() {
    const db = conect()
    const res = db.getAllSync('SELECT * FROM tasks')
    return res
  }

  async function createTask(id, title) {
    const db = conect()
    const res = db.runSync(
      `INSERT INTO tasks (id, title) VALUES (?, ?)`,
      id,
      title
    )
    asingTasks()
  }

  async function restarTable() {
    deleteTable()
    createTable()
  }

  async function updateTask({
    id,
    title,
    done,
    expirationDate,
    startDate,
    progress
  }) {
    const db = conect()
    const { query, values } = getUpdateTask({
      id,
      title,
      startDate,
      expirationDate,
      done,
      progress
    })
    const res = db.runSync(query, values)
    asingTasks()
  }

  async function deleteTask(id) {
    const db = conect()
    db.runSync('DELETE FROM tasks WHERE id = ?', [id])
    asingTasks()
  }

  function asingTasks() {
    const res = getTasks()
    setTasks(res)
  }

  useEffect(() => {
    asingTasks()
  }, [])

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    createTable,
    restarTable,
    asingTasks
  }
}
