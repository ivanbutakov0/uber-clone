import CustomButton from "@/components/CustomButton"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { icons, images } from "@/constants"
import { useSignUp } from "@clerk/clerk-expo"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Alert, Image, ScrollView, Text, View } from "react-native"
import { ReactNativeModal } from "react-native-modal"
import { SafeAreaView } from "react-native-safe-area-context"

interface SignUpForm {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  })

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    email: "",
    code: "",
  })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setVerification({
        ...verification,
        state: "pending",
      })
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === "complete") {
        // TODO: Create a database user!
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({
          ...verification,
          state: "success",
        })
      } else {
        setVerification({
          ...verification,
          error: "verification failed",
          state: "failed",
        })
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      })
    }
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

          <Link
            href="/sign-in"
            className="text-center text-lg text-general-200 mt-10"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500 font-bold"> Log in</Text>
          </Link>

          {/* TODO: Create another modal for test verification */}

          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") setShowSuccessModal(true)
            }}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-center font-JakartaSemiBold font-bold text-3xl mb-2">
                Verification...
              </Text>
              <Text className="font-Jakarta mb-5">
                We've sent a verification code to {form.email}
              </Text>
              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) => {
                  setVerification({
                    ...verification,
                    code,
                  })
                }}
              />

              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}

              <CustomButton
                title="Verify Email"
                onPress={onPressVerify}
                className="mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className="w-28 h-28 mx-auto my-5"
              />
              <Text className="text-center font-JakartaSemiBold font-bold text-3xl mt-7">
                Verified!
              </Text>
              <Text className="text-center text-general-200 mt-2 max-w-64 mx-auto">
                You have successfully verified your account.
              </Text>
              <CustomButton
                title="Browse Home"
                onPress={() => {
                  setShowSuccessModal(false)
                  router.replace("/(root)/(tabs)/home")
                }}
                className="mt-10"
              />
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
