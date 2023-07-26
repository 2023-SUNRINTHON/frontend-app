import { Image } from "expo-image";
import safearea from "../../@types/safearea";
import { Props as NaviProps } from "../../@types/predefined";
import Button from "../../components/Button/Icon";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Touchable,
} from "react-native";
import BottomNav from "../../components/BottomNav";
import { Font, Pretendard } from "../../utils/font";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {} & NaviProps.TabNavigation;

type ButtonProps = {
  title: string;
};

function ProfileButton(props: ButtonProps) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.6} style={buttonStyles.container}>
        <Text
          style={Font({
            size: 16,
            weight: Pretendard[600],
            color: "#1a2962",
          })}
        >
          {props.title}
        </Text>
        <Image
          style={{
            width: 16,
            height: 16,
          }}
          source={require("../../assets/images/alert/right.png")}
        />
      </TouchableOpacity>
    </>
  );
}

const buttonStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default function Account(props: Props) {
  return (
    <>
      <SafeAreaView style={safearea.SafeArea}>
        <BottomNav enabled="Account" navigation={props.navigation} />
        <ScrollView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 26,
            }}
          >
            <Image
              style={{
                width: 148,
                height: 26,
              }}
              source={require("../../assets/images/logo.png")}
            />
            <View
              style={{
                gap: 10,
                flexDirection: "row",
              }}
            >
              <Button
                onPress={() => props.navigation.navigate("Notice")}
                image="notice"
              />
              <Button
                onPress={() => props.navigation.navigate("Alert")}
                image="alert"
              />
            </View>
          </View>

          <View style={styles.box}>
            <View
              style={{
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: "#E3E9FF",
                width: 48,
                height: 48,
                overflow: "hidden",
              }}
            >
              <Image
                contentFit="cover"
                style={{
                  width: 48,
                  height: 48,
                  zIndex: -1,
                }}
                source={require("../../assets/images/mockup/profile.jpeg")}
              />
            </View>
            <View
              style={{
                gap: 8,
              }}
            >
              <Text
                style={Font({
                  size: 18,
                  color: "#1a2962",
                  weight: Pretendard[600],
                })}
              >
                김성빈 회원님
              </Text>
              <Text
                style={Font({
                  size: 14,
                  color: "#8592C5",
                  weight: Pretendard[500],
                })}
              >
                bini060315kim@gmail.com
              </Text>
            </View>
          </View>

          <View
            style={{
              gap: 38,
            }}
          >
            <View style={styles.buttonWrapper}>
              <Text>내 정보</Text>
              <View style={{ gap: 8 }}>
                <ProfileButton title="프로필 변경하기" />
                <ProfileButton title="닉네임 변경하기" />
              </View>
            </View>

            <View style={styles.buttonWrapper}>
              <Text>방문 기록</Text>
              <View style={{ gap: 8 }}>
                <ProfileButton title="최근 신고하신 제보 목록" />
                <ProfileButton title="최근 봤던 피해 상황 목록" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#F4F7FF",
  },
  box: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 16,
    marginBottom: 26,
    alignItems: "center",
  },
  buttonWrapper: {
    gap: 24,
  },
  title: Font({
    size: 18,
    color: "#8592C5",
    weight: Pretendard[500],
  }),
});
