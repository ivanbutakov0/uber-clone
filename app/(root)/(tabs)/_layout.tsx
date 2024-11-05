import { icons } from "@/constants"
import { Tabs } from "expo-router"
import { Image, View } from "react-native"

interface TabIconProps {
  focused: boolean
  source: any
}

const TabIcon = ({ focused, source }: TabIconProps) => {
  return (
    <View
      className={`w-16 h-16 flex items-center justify-center  rounded-full ${focused && "bg-success-500"}`}
    >
      <Image
        source={source}
        className="w-7 h-7"
      />
    </View>
  )
}

const Layout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.home}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          headerShown: false,
          title: "Rides",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.list}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.chat}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.profile}
            />
          ),
        }}
      />
    </Tabs>
  )
}
export default Layout
