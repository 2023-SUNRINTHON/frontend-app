import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Login from "./screens/Login/Login";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import LoginComplete from "./screens/Login/Complete";
import Main from "./screens/Main/Main";
import List from "./screens/List/List";
import Account from "./screens/Account/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { menus } from "./@types/menus";
import Detail from "./screens/Detail/Detail";
import Alert from "./screens/Alert/Alert";
import Notice from "./screens/Notice/Notice";

const Stack = createStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator<RootTabParams>();

SplashScreen.preventAutoHideAsync();

function ScreenTabs() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            width: 0,
            height: 0,
          },
        })}
      >
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  const [fontsLoaded] = useFonts({
    Pretendard: require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
    "Pretendard-Light": require("./assets/fonts/Pretendard-Light.otf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginComplete" component={LoginComplete} />
            <Stack.Screen name="Alert" component={Alert} />
            <Stack.Screen name="Notice" component={Notice} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Screens" component={ScreenTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
