import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Font, Pretendard } from "../../utils/font";
import { Image } from "expo-image";

type Props = {
  title: string;
  subTitle: string;
  around: string;
  safety: string;
  approach: string;
  onPress: () => void;
};

const InfoImage = {
  eco: require("../../assets/images/frame/eco.png"),
  run: require("../../assets/images/frame/run.png"),
};

type InfoProps = {
  title: string;
  content: string;
  image: keyof typeof InfoImage;
};

function Info({ title, content, image }: InfoProps) {
  return (
    <View style={styles.Info}>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Text
          style={Font({
            size: 14,
            weight: Pretendard[500],
            color: "#8592c5",
          })}
        >
          {title}
        </Text>
        <Image
          style={{
            width: 18,
            height: 18,
          }}
          source={InfoImage[image]}
        />
      </View>
      <Text
        style={Font({
          size: 20,
          weight: Pretendard[600],
          color: "#1a2962",
        })}
      >
        {content}
      </Text>
    </View>
  );
}

export default function BottomModal(props: Props) {
  const { title, subTitle, around, safety, approach, onPress } = props;

  return (
    <>
      <TouchableOpacity onPress={() => onPress()} style={styles.background} />
      <View style={styles.container}>
        <View
          style={{
            gap: 24,
          }}
        >
          <View
            style={{
              gap: 3,
            }}
          >
            <Text
              style={Font({
                size: 20,
                weight: Pretendard[600],
                color: "#1a2962",
              })}
            >
              {title}
            </Text>
            <Text
              style={Font({
                size: 14,
                weight: Pretendard[500],
                color: "#BAC0D7",
              })}
            >
              {subTitle}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
            }}
          >
            <Info title="안전 범위" content={safety} image="eco" />
            <Info title="접근 가능여부" content={approach} image="run" />
          </View>
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={Font({
              size: 14,
              weight: Pretendard[500],
              color: "#1a2962",
            })}
          >
            근처 지역 정보
          </Text>
          <Text
            style={Font({
              size: 14,
              weight: Pretendard[500],
              color: "#8592c5",
            })}
          >
            {around}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Dimensions.get("window").height - 120,
    backgroundColor: "#000000",
    opacity: 0.5,
    zIndex: 1,
  },
  container: {
    position: "absolute",
    bottom: 76,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#ffffff",
    zIndex: 1000,
    gap: 30,
  },
  Info: {
    paddingHorizontal: 14,
    paddingVertical: 15,
    backgroundColor: "#f2f5ff",
    borderRadius: 12,
    gap: 10,
    flex: 1,
  },
});
