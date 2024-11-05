import { Text, View } from "react-native"

interface GoogleTextInputProps {
  icon: any
  containerStyle: string
  handlePress: () => void
}

const GoogleTextInput = ({
  icon,
  containerStyle,
  handlePress,
}: GoogleTextInputProps) => {
  return (
    <View
      className={`flex flex-row justify-center items-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
    >
      <Text>Search</Text>
    </View>
  )
}
export default GoogleTextInput
