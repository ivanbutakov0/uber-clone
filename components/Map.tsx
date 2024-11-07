import { Text } from "react-native"
import MapView, { PROVIDER_DEFAULT } from "react-native-maps"

const Map = () => {
  return (
    <MapView
      className="w-full h-full"
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text className="w-[300px] h-full">Map</Text>
    </MapView>
  )
}
export default Map
