import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export namespace Props {
  export type Navigation = {
    navigation: NativeStackNavigationProp<RootStackParams>;
  };

  export type TabNavigation = {
    navigation: NativeStackNavigationProp<TabStackParams>;
  };
}

export {};
