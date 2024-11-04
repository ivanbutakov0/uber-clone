import CustomButton from "@/components/CustomButton"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { icons, images } from "@/constants"
import { Link } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface SignUpForm {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  })

  const onSignUpPress = () => {
    console.log(form)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="relative w-full h-[250px]">
          <Image
            className="z-0 w-full h-[250px]"
            source={images.signUpCar}
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-8 left-5">
            Create your account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: SignUpForm["name"]) =>
              setForm({ ...form, name: value })
            }
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: SignUpForm["email"]) =>
              setForm({ ...form, email: value })
            }
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: SignUpForm["password"]) =>
              setForm({ ...form, password: value })
            }
            secureTextEntry
          />

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-7 mb-4"
          />

          <OAuth />

          {/* TODO: OAuth */}

          <Link
            href="/sign-in"
            className="text-center text-lg text-general-200 mt-10"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500 font-bold"> Log in</Text>
          </Link>

          {/* TODO: Verification Modal */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
