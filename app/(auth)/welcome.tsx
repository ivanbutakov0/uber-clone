import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Swiper from "react-native-swiper"
import { router } from "expo-router"
import { onboarding } from "@/constants"
import CustomButton from "@/components/CustomButton"
import { useRef, useState } from "react"

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const isLastSlide = activeIndex === onboarding.length - 1

  const handleSkip = () => {
    router.replace("/(auth)/sign-up")
  }

  const handleNextClick = () => {
    // eslint-disable-next-line no-unused-expressions
    isLastSlide
      ? router.replace("/(auth)/sign-up")
      : swiperRef.current?.scrollBy(1)
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-between">
      <TouchableOpacity
        className="ml-auto my-7 px-6"
        onPress={handleSkip}
      >
        <Text className="font-bold font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-sm" />}
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#2F74FA] rounded-sm" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            className="flex-1 items-center justify-center p-5"
            key={item.id}
          >
            <Image
              className="w-full h-[300px] mb-12"
              resizeMode="contain"
              source={item.image}
            />
            <Text className="text-center font-bold text-3xl mb-2.5">
              {item.title}
            </Text>
            <Text className="text-center font-medium text-lg text-general-200">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        onPress={handleNextClick}
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10 mb-9"
      />
    </SafeAreaView>
  )
}

export default Welcome
