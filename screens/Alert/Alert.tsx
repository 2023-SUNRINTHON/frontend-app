import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import safearea from "../../@types/safearea";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, ImageBackground } from "expo-image";
import { Font, Pretendard } from "../../utils/font";
import { Props as NaviProps } from "../../@types/predefined";
import { useEffect, useState } from "react";
import warn from "../../api/info/warn";

type Props = {} & NaviProps.TabNavigation;

const AlertImage = {
  alert: require("../../assets/images/list/alert.png"),
  notice: require("../../assets/images/list/notice.png"),
};

type AlertItemProps = {
  image: keyof typeof AlertImage;
  title: string;
  content: string;
};

function AlertItem(props: AlertItemProps) {
  const { image, title, content } = props;

  return (
    <>
      <View style={noticeStyles.container}>
        <Image
          style={{
            width: 32,
            height: 32,
          }}
          source={AlertImage[image]}
        />
        <View
          style={{
            gap: 8,
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
              size: 16,
              weight: Pretendard[600],
              color: "#1a2962",
            })}
          >
            {content}
          </Text>
        </View>
      </View>
    </>
  );
}

type AlertProps = {
  date: string;
  items: AlertItemProps[];
};

function AlertWrapper(props: AlertProps) {
  const { date, items } = props;

  return (
    <>
      <View
        style={{
          gap: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={Font({
              size: 18,
              weight: Pretendard[500],
              color: "#8592C5",
            })}
          >
            {date}
          </Text>
          <Text
            style={Font({
              size: 18,
              weight: Pretendard[600],
              color: "#3c66fd",
            })}
          >
            총 {items.length}개
          </Text>
        </View>
        <View
          style={{
            gap: 8,
          }}
        >
          {items.map((v, i) => (
            <AlertItem key={i} {...v} />
          ))}
        </View>
      </View>
    </>
  );
}

const noticeStyles = StyleSheet.create({
  container: {
    borderRadius: 12,
    gap: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
  },
});

export default function Alert(props: Props) {
  const [alertList, setAlertList] = useState<
    {
      region: string;
      title: string;
    }[]
  >();
  const [alert, setAlert] = useState<AlertProps[]>();

  useEffect(() => {
    warn().then((res) => {
      setAlertList(res);
    });
  }, []);

  useEffect(() => {
    if (!alertList) return;
    setAlert([
      {
        date: new Date().toISOString().substring(0, 10),
        items: alertList?.map((v) => {
          return {
            image: "alert" as keyof typeof AlertImage,
            title: v.region,
            content: v.title.split(" / ")[1],
          };
        }),
      },
    ]);
  }, [alertList]);

  // const alert = [
  //   {
  //     date: "오늘(7/20일)",
  //     items: [
  //       {
  //         image: "notice" as keyof typeof AlertImage,
  //         title: "중요 피해 상황 공지가 하나 있어요",
  //         content: "폭우로 인한 강남역 침수 관련 안내",
  //       },
  //       {
  //         image: "alert" as keyof typeof AlertImage,
  //         title: "앱 시스템 관련 안내",
  //         content: "개인정보 관련 약관 업데이트 안내",
  //       },
  //       {
  //         image: "notice" as keyof typeof AlertImage,
  //         title: "제보 업데이트 안내",
  //         content: "해당 제보가 공식 공지로 변경되었습니다.",
  //       },
  //     ],
  //   },
  //   {
  //     date: "7/17일",
  //     items: [
  //       {
  //         image: "notice" as keyof typeof AlertImage,
  //         title: "중요 피해 상황 공지가 하나 있어요",
  //         content: "폭우로 인한 강남역 침수 관련 안내",
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      {alert && (
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
                알림
              </Text>
            </TouchableOpacity>
            <View
              style={{
                gap: 50,
              }}
            >
              {alert.map((v, i) => (
                <AlertWrapper key={i} {...v} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
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
