import { useFonts } from "expo-font";
import { useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Font, Pretendard } from "../../utils/font";
import { LinearGradient } from "expo-linear-gradient";
import { Props } from "../../@types/predefined";
import { status } from "./Complete";
import safearea from "../../@types/safearea";

SplashScreen.preventAutoHideAsync();

export default function Login(props: Props.Navigation) {
  const { navigation: navigation } = props;

  return (
    <>
      <SafeAreaView style={safearea.SafeArea}>
        <View style={styles.inner}>
          <Image
            style={{
              width: "100%",
              height: 625,
              position: "absolute",
              marginHorizontal: 20,
              top: 0,
            }}
            source={require("../../assets/images/artwork.png")}
          />
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            style={{
              position: "absolute",
              width: "100%",
              height: 352,
              bottom: 0,
            }}
          />
          <View
            style={{
              gap: 30,
            }}
          >
            <Image
              style={{
                width: 154,
                height: 27,
              }}
              source={require("../../assets/images/logo.png")}
            />
            <View
              style={{
                gap: 8,
              }}
            >
              <Text
                style={Font({
                  size: 32,
                  weight: Pretendard.Regular,
                })}
              >
                <Text
                  style={Font({
                    size: 32,
                    weight: Pretendard.Bold,
                  })}
                >
                  플루가드,
                </Text>{" "}
                안전을{"\n"}위한 최고의 도우미.
              </Text>
              <Text
                style={Font({
                  size: 14,
                  weight: Pretendard[400],
                  color: "#bdbdbd",
                })}
              >
                비가 오고~ 슬픈 상황이 흐를때, 플루가드.
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.line} />
              <Text
                style={Font({
                  size: 14,
                  weight: Pretendard[400],
                  color: "#bdbdbd",
                })}
              >
                플루가드 시작하기
              </Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoginComplete", {
                  status: status.register,
                  name: "김성빈",
                })
              }
              style={styles.button}
            >
              <View style={styles.buttonInner}>
                <Image
                  style={{ width: 17, height: 16 }}
                  source={require("../../assets/images/google.png")}
                />
                <Text
                  style={Font({
                    size: 16,
                    weight: Pretendard[400],
                    color: "#000000",
                  })}
                >
                  Google{" "}
                  <Text
                    style={Font({
                      size: 16,
                      weight: Pretendard[600],
                    })}
                  >
                    로그인/가입하기
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inner: {
    height: "100%",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Pretendard",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e4e4e4",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: 100,
    height: 0.5,
    backgroundColor: "#bdbdbd",
  },
});
