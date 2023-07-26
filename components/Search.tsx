import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextInput,
} from "react-native";
import { Font, Pretendard } from "../utils/font";
import * as Location from "expo-location";
import geocode from "../api/info/geocode";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function Search(props: Props) {
  const { style } = props;
  const [input, setInput] = useState("");

  const [place, setPlace] = useState<string | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setLocation(location);
        }
      );
      setLocation(location);
    })();
  }, []);

  useMemo(() => {
    if (!location) return;
    geocode(location.coords.latitude, location.coords.longitude).then((res) => {
      setPlace(res.text);
    });
  }, [location]);

  return (
    <>
      <View style={[styles.container, style]}>
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          source={require("../assets/images/maps/search.png")}
        />
        <TextInput
          placeholder={`현재 위치: ${place ?? "위치를 찾을 수 없음"}`}
          onChangeText={setInput}
          value={input}
          style={Font({
            size: 15,
            weight: Pretendard[400],
            color: "#000000",
          })}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E9FF",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
