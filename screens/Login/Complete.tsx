import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Image, Text } from "react-native";
import { Font, Pretendard } from "../../utils/font";
import { Props as NaviProps } from "../../@types/predefined";
import Modal from "../../components/Modal";
import safearea from "../../@types/safearea";

type Props = {
  route: RouteProp<RootStackParams, "LoginComplete">;
} & NaviProps.Navigation;

export enum status {
  login,
  register,
}

export type LoginCompleteProps = {
  status: status;
  name: string;
};

export const StatusMessage = {
  [status.register]: {
    title: "회원가입 완료!",
    message: ["첫 가입을 환영합니다!", "이제 플루가드를 사용하실 수 있어요!"],
  },
  [status.login]: {
    title: "로그인 완료!",
    message: ["환영합니다!", "플루가드에 다시 와주셨군요!"],
  },
} as const;

export default function LoginComplete(props: Props) {
  const { status, name } = props.route.params;
  const { navigate } = props.navigation;

  return (
    <>
      <SafeAreaView style={safearea.SafeArea}>
        <View style={styles.inner}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={require("../../assets/images/check_circle.png")}
          />
          <View
            style={{
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={Font({
                size: 30,
                weight: Pretendard[700],
                color: "#3c66fd",
              })}
            >
              {StatusMessage[status].title}
            </Text>
            <Text
              style={Font({
                size: 18,
                weight: Pretendard[500],
                color: "#999999",
                lineHeight: 28,
                align: "center",
              })}
            >
              {name} 회원님, {StatusMessage[status].message[0]}
              {"\n"}
              {StatusMessage[status].message[1]}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => navigate("Screens")}
              style={styles.button}
            >
              <Text
                style={Font({
                  size: 16,
                  weight: Pretendard[700],
                  color: "#ffffff",
                })}
              >
                플루가드 시작하기
              </Text>
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
    backgroundColor: "#fafafa",
  },
  inner: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#3c66fd",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
