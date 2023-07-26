import {
  useState,
  useEffect,
  useRef,
  LegacyRef,
  createRef,
  useMemo,
} from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  Image,
  Text,
  View,
} from "react-native";
import MapView, {
  Callout,
  Circle,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import * as Location from "expo-location";
import accident from "../api/info/accident";
import BottomModal from "./Slide/BottomModal";

type Props = {
  style?: StyleProp<ViewStyle>;
  click: boolean;
};

export default function GoogleMap(props: Props) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [cps, setCps] = useState<any[] | null>(null);
  const [accidents, setAccidents] = useState<any[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bottomModal, setBottomModal] = useState<any>(null);

  const mapRef = useRef<MapView>();

  const image = useMemo(() => require("../assets/images/maps/circle.png"), []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

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
    accident().then((data) => {
      setAccidents(data.trafficEvents);
      setCps(data.eventCps);
    });
  }, []);

  useEffect(() => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: location?.coords.latitude ?? 0,
          longitude: location?.coords.longitude ?? 0,
        },
        zoom: 17,
      },
      { duration: 1000 }
    );
  }, [props.click]);

  return (
    <>
      {location?.coords.latitude && (
        <MapView
          ref={(ref) => (mapRef.current = ref as MapView)}
          provider={PROVIDER_GOOGLE}
          style={props.style}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={location?.coords as LatLng}
            anchor={{
              x: 0.5,
              y: 0.5,
            }}
          >
            <Image
              style={{
                width: 90,
                height: 90,
              }}
              source={image}
            />
          </Marker>
          {accidents?.map((accident, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: accident.point.pointY,
                  longitude: accident.point.pointX,
                }}
                anchor={{
                  x: 0.5,
                  y: 0.5,
                }}
                onPress={() => {
                  setBottomModal(accident);
                }}
              />
            );
          })}
        </MapView>
      )}
      {bottomModal && (
        <BottomModal
          title={bottomModal.description}
          subTitle={`${
            cps?.find((x) => bottomModal.cpCode == x.code).name
          } 제공 정보`}
          around="신논현역, 강남역, 역삼역, 태헤란로, 경부고속도로 부근, 2호선, 7호선, 신분당선, 9호선"
          safety={
            {
              "[공사]": "안전합니다",
              "[사고]": "위험합니다",
              "[기상]": "매우 위험합니다",
            }[
              RegExp(/\[.+\]/).exec(bottomModal.description)?.[0] ?? "[공사]"
            ] ?? "안전합니다."
          }
          approach={
            {
              "[공사]": "조심하세요",
              "[사고]": "접근불가",
              "[기상]": "접근불가",
            }[
              RegExp(/\[.+\]/).exec(bottomModal.description)?.[0] ?? "[공사]"
            ] ?? "조심하세요."
          }
          onPress={() => setBottomModal(null)}
        />
      )}
    </>
  );
}
