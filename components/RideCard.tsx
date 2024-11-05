import { icons } from "@/constants"
import { formatDate, formatTime } from "@/lib/utils"
import { Ride } from "@/types/type"
import { Image, Text, View } from "react-native"

interface RideCardProps {
  ride: Ride
}

const RideCard = ({
  ride: {
    destination_address,
    destination_longitude,
    destination_latitude,
    origin_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: RideCardProps) => {
  const formattedDate = formatDate(created_at)
  const formattedTime = formatTime(ride_time)

  return (
    <View className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3 p-4">
      <View className="flex flex-row items-center justify-between">
        <View>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />
        </View>

        <View className="flex-1 flex-col mx-5 gap-y-5">
          <View className="flex flex-row items-center gap-x-3">
            <Image
              source={icons.to}
              className="w-6 h-6"
            />
            <Text className="text-md font-JakartaMedium">
              {destination_address}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-3">
            <Image
              source={icons.point}
              className="w-6 h-6"
            />
            <Text className="text-md font-JakartaMedium">{origin_address}</Text>
          </View>
        </View>
      </View>

      <View className="flex flex-col w-full m-5 bg-general-500 reounded-lg px-3 items-start justify-center rounded-2xl">
        <View className="flex flex-row justify-between items-center w-full py-3 border-b border-white">
          <Text className="text-general-200 font-medium">Date & Time</Text>
          <Text className="font-semibold">
            {formattedDate}, {formattedTime}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center w-full py-3 border-b border-white">
          <Text className="text-general-200 font-medium">Driver</Text>
          <Text className="font-semibold">
            {driver.first_name} {driver.last_name}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center w-full py-3 border-b border-white">
          <Text className="text-general-200 font-medium">Car seats</Text>
          <Text className="font-semibold">{driver.car_seats}</Text>
        </View>
        <View className="flex flex-row justify-between items-center w-full py-3">
          <Text className="text-general-200 font-medium">Payment Status</Text>
          <Text
            className={`font-semibold capitalize ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
          >
            {payment_status}
          </Text>
        </View>
      </View>
    </View>
  )
}
export default RideCard
