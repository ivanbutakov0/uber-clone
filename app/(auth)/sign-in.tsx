import CustomButton from "@/components/CustomButton"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { icons, images } from "@/constants"
import { useSignIn } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { useCallback, useState } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface SignInForm {
  email: string
  password: string
}

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  })

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/")
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form, signIn, setActive, router])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="relative w-full h-[250px]">
          <Image
            className="z-0 w-full h-[250px]"
            source={images.signUpCar}
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-8 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: SignInForm["email"]) =>
              setForm({ ...form, email: value })
            }
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: SignInForm["password"]) =>
              setForm({ ...form, password: value })
            }
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-7 mb-4"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="text-center text-lg text-general-200 mt-10"
          >
            <Text>Don't have an account?</Text>
            <Text className="text-primary-500 font-bold"> Sign up</Text>
          </Link>

          {/* TODO: Verification Modal */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
