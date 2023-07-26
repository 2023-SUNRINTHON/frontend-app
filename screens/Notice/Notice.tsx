import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import safearea from "../../@types/safearea";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Font, Pretendard } from "../../utils/font";
import { Props as NaviProps } from "../../@types/predefined";

type Props = {} & NaviProps.TabNavigation;

type NoticeItemProps = {
  title: string;
  date: string;
  content: string;
};

function NoticeItem(props: NoticeItemProps) {
  const { title, date, content } = props;

  return (
    <>
      <View style={noticeStyles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={Font({
              size: 14,
              weight: Pretendard[500],
              color: "#8592C5",
            })}
          >
            {title}
          </Text>
          <Text
            style={Font({
              size: 14,
              weight: Pretendard[500],
              color: "#8592C5",
            })}
          >
            {date}
          </Text>
        </View>
        <Text
          style={Font({
            size: 16,
            weight: Pretendard[500],
            color: "#1A2962",
          })}
        >
          {content}
        </Text>
      </View>
    </>
  );
}

const noticeStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    gap: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});

export default function Notice(props: Props) {
  const noticeList = [
    {
      title: "폭우 관련 중요 공지사항",
      date: "23/7/22",
      content: "폭우로 인한 강남역 침수 관련 안내",
    },
    {
      title: "앱 시스템 관련 안내",
      date: "23/7/17",
      content: "개인정보 관련 약관 업데이트 안내",
    },
    {
      title: "폭우 관련 중요 공지사항",
      date: "23/7/22",
      content: "폭우로 인한 강남역 침수 관련 안내",
    },
    {
      title: "앱 시스템 관련 안내",
      date: "23/7/17",
      content: "개인정보 관련 약관 업데이트 안내",
    },
  ];

  return (
    <>
      <SafeAreaView style={safearea.SafeArea}>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={{
              gap: 8,
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 40,
            }}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={require("../../assets/images/alert/back.png")}
            />
            <Text
              style={Font({
                size: 24,
                weight: Pretendard[600],
                color: "#1a2962",
              })}
            >
              공지사항
            </Text>
          </TouchableOpacity>
          <View
            style={{
              gap: 8,
            }}
          >
            {noticeList.map((v, i) => (
              <NoticeItem key={i} {...v} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 34,
    backgroundColor: "#F4F7FF",
  },
});
