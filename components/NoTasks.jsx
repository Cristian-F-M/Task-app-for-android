import { Image, Text, View } from 'react-native'
const thisIsFine = require('../assets/this-is-fine.gif')

export function NoTasks() {
  return (
    <>
      <View className="mt-16 items-center">
        <Text className="text-center text-gray-300 text-xl">No hay tareas</Text>
        <View className="">
          <Image
            className="mt-5"
            source={thisIsFine}
            style={{ width: 300, height: 200 }}
          />
        </View>
      </View>
    </>
  )
}
