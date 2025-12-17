import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Raleway-Light":require("../assets/fonts/Raleway-Light.ttf"),
    "Raleway-Regular":require("../assets/fonts/Raleway-Regular.ttf"),
    "CutOutsFLF":require("../assets/fonts/CutOutsFLF.ttf"),
    "CFNuclearWar-Regular":require("../assets/fonts/CFNuclearWar-Regular.ttf"),
    "Chocolate Bar Demo":require("../assets/fonts/Chocolate Bar Demo.otf"),
    "Fontspring-DEMO-leyendo-bold":require("../assets/fonts/Fontspring-DEMO-leyendo-bold.otf"),
    "BrophyOpti":require("../assets/fonts/BrophyOpti.otf")
  })

  if (!fontsLoaded) return null

  return(
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
