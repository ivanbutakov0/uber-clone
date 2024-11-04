import CustomButton from "@/components/CustomButton"
import { icons } from "@/constants"
import { Image, Text, View } from "react-native"

const OAuth = () => {
  const handleGoogleSignIn = () => {
    console.log("Sign in with Google")
  }

  return (
    <View>
      <View className="flex flex-row items-center">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="font-Jakarta px-4">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        className="mt-5 w-full shadow-none"
        onPress={handleGoogleSignIn}
        title="Log In with Google"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5 mx-2"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
      />
    </View>
  )
}
export default OAuth
