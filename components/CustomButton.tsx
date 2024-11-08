import { Text, TouchableOpacity } from "react-native"

interface CustomButtonProps {
  title: string
  onPress: () => void
  bgVariant?: "primary" | "secondary" | "danger" | "success" | "outline"
  textVariant?: "primary" | "secondary" | "danger" | "success" | "default"
  IconLeft?: any
  IconRight?: any
  className?: string
}

function getBgVariantStyle(variant: CustomButtonProps["bgVariant"]) {
  switch (variant) {
    case "secondary":
      return "bg-gray-500"
    case "danger":
      return "bg-red-500"
    case "success":
      return "bg-green-500"
    case "outline":
      return "bg-transparent border border-neutral-300"
    default:
      return "bg-primary-500"
  }
}

function getTextVariantStyle(variant: CustomButtonProps["textVariant"]) {
  switch (variant) {
    case "primary":
      return "text-black"
    case "secondary":
      return "text-gray-100"
    case "danger":
      return "bg-red-100"
    case "success":
      return "bg-green-100"
    default:
      return "text-white"
  }
}

const CustomButton = ({
  title,
  onPress,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`w-full rounded-full p-4 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      onPress={onPress}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  )
}

export default CustomButton
