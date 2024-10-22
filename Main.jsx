import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'
import { Screen } from './components/Screen'
import { StatusBar } from 'expo-status-bar'
import { TaskItem } from './components/TaskItem'
import { NoTasks } from './components/NoTasks'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-native-modalbox'
import { randomUUID } from 'expo-crypto'
import { useTasks } from './context/Task'
import { LinearGradient } from 'expo-linear-gradient'

export function Main() {
  const { tasks, setTasks, createTask, getTasks, deleteTask, updateTask } =
    useTasks()
  const [isOpen, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [taskText, setTaskText] = useState('')
  const inputTask = useRef(null)

  function handleClicAddTaks() {
    if (!isOpen) {
      setOpen(true)
      inputTask.current?.focus()
      return
    }

    if (taskText === '') {
      return setError('No puede estar vacío')
    }
    const UUID = randomUUID()
    createTask(UUID, taskText)
    setOpen(false)
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          paddingHorizontal: 4
        }}
        className="mt-5 flex flex-1"
      >
        <StatusBar style="light" />
        <View className="flex flex-col justify-center items-center">
          <Text className="text-center text-3xl text-gray-200 font-semibold">
            Lista de tareas
          </Text>
          <Pressable
            className="mt-2 bg-blue-700 px-3 py-1 rounded-lg"
            onPress={() => {
              handleClicAddTaks(tasks.length + 1, '2 title')
            }}
          >
            <Text className="text-white text-base">Añadir</Text>
          </Pressable>
        </View>

        {tasks.length <= 0 && <NoTasks />}
        {tasks.length > 0 && (
          <View className="my-8">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                deleteFunc={deleteTask}
                editFunc={updateTask}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        isOpen={isOpen}
        onClosed={() => setOpen(false)}
        position="top"
        entry="top"
        className="h-56"
        coverScreen={true}
      >
        <View className="flex-1 bg-gray-800 p-4">
          <Text className="text-gray-200 text-2xl">Agregar tarea</Text>
          <View className="border border-gray-200 rounded-lg my-3 px-2 py-2">
            <TextInput
              className="text-gray-200 text-base"
              ref={inputTask}
              autoFocus={true}
              keyboardType="default"
              onSubmitEditing={handleClicAddTaks}
              onChangeText={t => {
                setError(null)
                setTaskText(t)
              }}
            />
          </View>
          <Text className="text-red-400 -mt-2 mb-3">{error && error}</Text>
          <Pressable
            className="mt-2 bg-blue-700 px-3 py-2 rounded-lg"
            onPress={handleClicAddTaks}
          >
            <Text className="text-white text-lg text-center">Guardar</Text>
          </Pressable>
        </View>
      </Modal>

      <LinearGradient colors={['#111827', '#1d2b4aee']}>
        <Text className="text-white text-sm text-center my-2">
          © <Text className="underline">Cristian Morales</Text> 22/10/2024
        </Text>
      </LinearGradient>
    </Screen>
  )
}
