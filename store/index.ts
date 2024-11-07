import { DriverStore, LocationStore, MarkerData } from "@/types/type"
import { create } from "zustand"

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) =>
    set((state) => ({
      ...state,
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    })),
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) =>
    set((state) => ({
      ...state,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    })),
}))

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId) =>
    set((state) => ({ ...state, selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers: drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}))
