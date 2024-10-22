import { useEffect, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Check from '../icons/Check'
import Trash from '../icons/Trash'
import * as Progress from 'react-native-progress'
import { useTasks } from '../context/Task'

export function TaskItem({ task }) {
  const { tasks, deleteTask, updateTask, asingTasks } = useTasks()
  const taskItemRef = useRef(null)
  const [widthaskItem, setWidthTaskItem] = useState(100)
  const [progress, setProgress] = useState(task.progress)
  const [taskIsDone, setTaskIsDone] = useState(task.done === 1)

  function getCountdownProgress(startDate, endDate) {
    const initialDate = new Date(startDate)
    const finishDate = new Date(endDate)
    const curDate = new Date()

    if (curDate >= finishDate) return 0

    const diff1 = (finishDate - initialDate) / (1000 * 60 * 60)
    const diff2 = (curDate - initialDate) / (1000 * 60 * 60)
    const rs = diff1 ? diff2 / diff1 : 0
    let progress = 1 - rs
    return parseFloat(progress.toFixed(3))
  }

  useEffect(() => {
    setProgress(task.progress)
    setTaskIsDone(task.done === 1)
  }, [])

  useEffect(() => {
    asingTasks()
    if (!taskIsDone) return

    const progressInterval = setInterval(() => {
      const localProgress = getCountdownProgress(
        task.startDate,
        task.expirationDate
      )
      const thereIsDates = task.expirationDate != null && task.startDate != null
      setProgress(localProgress)

      if (thereIsDates && localProgress <= 0) {
        deleteTask(task.id)
      }
    }, 1000)

    return () => clearInterval(progressInterval)
  }, [taskIsDone])

  useEffect(() => {
    updateTask({
      id: task.id,
      progress
    })
  }, [progress])

  useEffect(() => {
    updateTask({
      id: task.id,
      done: taskIsDone
    })
  }, [taskIsDone])

  function handleClicDeleteTask(id) {
    deleteTask(id)
  }

  function handleClicDoneTask() {
    const now = new Date()
    const expirationDate = new Date(
      now.getTime() + 3 * 60 * 60 * 1000
    ).toISOString()
    const done = !taskIsDone

    if (taskIsDone) {
      setProgress(1)
      setTaskIsDone(done)
      return
    }

    const updatedProgress = getCountdownProgress(
      now.toISOString(),
      expirationDate
    )
    setProgress(updatedProgress)
    setTaskIsDone(done)
    updateTask({
      id: task.id,
      done,
      expirationDate,
      startDate: now.toISOString(),
      progress
    })
  }

  return (
    <View
      className={`flex flex-col rounded-lg bg-gray-500/20 my-1 ${taskIsDone && progress > 0.9 && 'rounded-br-none'} 
                                                                 ${taskIsDone && progress > 0.1 && 'rounded-bl-none'}`}
      onLayout={({ nativeEvent }) => {
        const width = nativeEvent.layout.width
        setWidthTaskItem(width)
      }}
    >
      <View
        className="flex flex-row justify-between py-1 px-2"
        ref={taskItemRef}
      >
        <View className="flex flex-1 flex-row mb-3 h-full w-full px-1 py-1 items-center">
          <BouncyCheckbox
            isChecked={taskIsDone}
            onPress={() => {
              handleClicDoneTask()
            }}
            disableText={true}
            size={28}
            fillColor="#166534"
            iconComponent={
              <Check
                className={`${taskIsDone ? 'text-white' : 'text-transparent'}`}
              />
            }
          />
          <Text
            className={`flex-1 text-gray-300 text-base ml-2 h-full ${taskIsDone && 'line-through'}`}
            onPress={() => {
              handleClicDoneTask()
            }}
            style={{ textAlignVertical: 'center' }}
          >
            {task.title}
          </Text>
        </View>
        <Pressable
          className="rounded-full flex justify-center items-center ml-1"
          onPress={() => handleClicDeleteTask(task.id)}
        >
          <Text className="text-white text-sm text-center bg-red-100/20 p-2 rounded-full">
            <Trash />
          </Text>
        </Pressable>
      </View>
      <View className={`${taskIsDone ? '' : 'opacity-0'}`}>
        <Progress.Bar
          progress={progress}
          width={widthaskItem}
          color={'#6b7280'}
          height={3}
          borderWidth={0}
        />
      </View>
    </View>
  )
}
