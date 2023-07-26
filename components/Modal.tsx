import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Alert,
} from "react-native";
import { Font, Pretendard } from "../utils/font";
import { Image } from "expo-image";
import * as Linking from "expo-linking";

const frameImage = {
  fireTruck: require("../assets/images/maps/fire_truck.png"),
  goverment: require("../assets/images/maps/goverment.png"),
  seoul: require("../assets/images/maps/seoul.png"),
};

type FrameProps = {
  title: string;
  content: string;
  image: keyof typeof frameImage;
  phone: string;
};

function Frame(props: FrameProps) {
  const { title, content, image } = props;

  function tel(phone: string) {
    let phoneNumber: string;
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  }

  function sms(phone: string) {
    let phoneNumber: string;
    if (Platform.OS === "android") {
      phoneNumber = `sms:${phone}`;
    } else {
      phoneNumber = `sms:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <View style={frameStyle.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 24,
              height: 24,
            }}
            source={frameImage[image]}
          />
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={Font({
                size: 16,
                weight: Pretendard[600],
                color: "#1a2962",
              })}
            >
              {title}
            </Text>
            <Text
              style={Font({
                size: 12,
                weight: Pretendard[500],
                color: "#8592c5",
              })}
            >
              {content}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 24,
          }}
        >
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
            }}
            activeOpacity={1}
            onPress={() => tel(props.phone)}
          >
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require("../assets/images/frame/call.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
            }}
            activeOpacity={1}
            onPress={() => sms(props.phone)}
          >
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require("../assets/images/frame/message.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const frameStyle = StyleSheet.create({
  container: {
    width: 316,
    borderRadius: 16,
    backgroundColor: "#f2f5ff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

type Props = {
  onPress: () => void;
};

export default function Modal(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={(e) => e.stopPropagation()}
        style={styles.inner}
      >
        <View style={styles.column}>
          <View style={styles.titleWrapper}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={require("../assets/images/maps/alert.png")}
            />
            <Text
              style={Font({
                size: 20,
                weight: Pretendard[600],
                color: "#1a2962",
              })}
            >
              침수/홍수 상황 신고하기
            </Text>
          </View>
          <View style={styles.buttonsWrapper}>
            <Frame
              title="119에 상황 신고하기"
              content="가장 빠르고, 안전한 119"
              image="fireTruck"
              phone="119"
            />
            <Frame
              title="안전디딤돌 신고하기"
              content="120, 110 등으로 바로 연결되요"
              image="goverment"
              phone="120"
            />
            <Frame
              title="서울시 풍수해 재난신고"
              content="02-2133-0071로 연결됩니다"
              image="seoul"
              phone="02-2133-0071"
            />
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 1000,
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    gap: 20,
  },
  buttonsWrapper: {
    gap: 8,
  },
});
