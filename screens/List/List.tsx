import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { Props as NaviProps } from "../../@types/predefined";
import safearea from "../../@types/safearea";
import BottomNav from "../../components/BottomNav";
import { Image } from "expo-image";
import Button from "../../components/Button/Icon";
import { Font, Pretendard } from "../../utils/font";
import Search from "../../components/Search";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect, useMemo } from "react";
import * as Location from "expo-location";
import geocode from "../../api/info/geocode";
import weatherApi from "../../api/info/weather";
import detailApi from "../../api/info/detail";

type Props = {} & NaviProps.TabNavigation;

type ContentProps = {
  title: string;
  subTitle: string;
  content: string;
  image?: 1 | 2;
  onPress?: () => void;
};

function Content(props: ContentProps) {
  const { title, subTitle, content, image, onPress } = props;

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={contentStyles.container}
      >
        <Image
          style={{
            width: 100,
            height: 124,
            borderRadius: 12,
          }}
          source={
            image === 1
              ? require("../../assets/images/mockup/sample1.png")
              : require("../../assets/images/mockup/sample2.png")
          }
        />
        <View
          style={{
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              gap: 3,
            }}
          >
            <Text
              style={Font({
                size: 16,
                weight: Pretendard[500],
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
              {subTitle}
            </Text>
          </View>
          <View
            style={{
              gap: 3,
            }}
          >
            <Text
              style={Font({
                size: 12,
                weight: Pretendard[500],
                color: "#8592c5",
              })}
            >
              홍수 정보:
            </Text>
            <Text
              style={Font({
                size: 16,
                weight: Pretendard[500],
                color: "#1a2962",
              })}
            >
              {content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const contentStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
});

export default function List(props: Props) {
  const [geo, setGeo] = useState<string | null>("서울특별시 용산구");
  const [weather, setWeatehr] = useState();
  const [detail, setDetail] = useState<{
    info: {
      time: string;
      title: string;
      content: string;
    }[];
    breaking: {
      time: string;
      title: string;
      content: string;
    }[];
  }>();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!location) return;
    geocode(location?.coords.latitude, location?.coords.longitude).then(
      (res) => {
        setGeo(res.text);
      }
    );
  }, [location]);

  useEffect(() => {
    if (!location) return;
    weatherApi(location?.coords.latitude, location?.coords.longitude).then(
      (res) => {
        setWeatehr(res);
      }
    );
  }, [location]);

  useEffect(() => {
    detailApi().then((res) => {
      setDetail(res);
    });
  }, []);

  const weatherStatus = useMemo(() => {
    if (!weather) return "로딩중...";
    const { 강수형태 }: { 강수형태: string } = weather;
    const code = parseInt(강수형태.split("코드값")[0]);

    switch (code) {
      case 0:
        return "맑음";
      case 1:
        return "비";
      case 2:
        return "비/눈";
      case 3:
        return "눈";
      case 4:
        return "소나기";
      case 5:
        return "빗방울";
      case 6:
        return "빗방울/눈날림";
      case 7:
        return "눈날림";
    }
  }, [weather]);

  return (
    <>
      {weather && (
        <SafeAreaView style={safearea.SafeArea}>
          <ScrollView style={styles.inner}>
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
            <Text
              style={[
                styles.title,
                {
                  marginBottom: 28,
                },
              ]}
            >
              현재 회원님의 위치 정보
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 50,
              }}
            >
              <View
                style={[
                  styles.content,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View
                  style={{
                    gap: 5,
                  }}
                >
                  <Text
                    style={Font({
                      size: 16,
                      color: "#1a2962",
                      weight: Pretendard[500],
                    })}
                  >
                    {geo}
                  </Text>
                  <Text
                    style={Font({
                      size: 12,
                      color: "#8592c5",
                      weight: Pretendard[500],
                    })}
                  >
                    다소 맑고 안전함
                  </Text>
                </View>
                <View
                  style={{
                    gap: 2,
                  }}
                >
                  <Text
                    style={Font({
                      size: 14,
                      weight: Pretendard[600],
                      color: "#1a2962",
                    })}
                  >
                    {weatherStatus}
                  </Text>
                  <Text
                    style={Font({
                      size: 50,
                      weight: Pretendard[600],
                      color: "#1a2962",
                    })}
                  >
                    {(weather["기온"] as string).split("℃")[0]}°
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.content,
                  {
                    gap: 15,
                  },
                ]}
              >
                <View
                  style={{
                    gap: 5,
                  }}
                >
                  <Text
                    style={Font({
                      size: 12,
                      color: "#8592c5",
                      weight: Pretendard[500],
                    })}
                  >
                    오늘 평균 강수량
                  </Text>
                  <Text
                    style={Font({
                      size: 18,
                      color: "#1a2962",
                      weight: Pretendard[600],
                    })}
                  >
                    {weather["1시간 강수량"]}
                  </Text>
                </View>
                <View
                  style={{
                    gap: 5,
                  }}
                >
                  <Text
                    style={Font({
                      size: 12,
                      color: "#8592c5",
                      weight: Pretendard[500],
                    })}
                  >
                    주변 침수 확률
                  </Text>
                  <Text
                    style={Font({
                      size: 18,
                      color: "#1a2962",
                      weight: Pretendard[600],
                    })}
                  >
                    {weatherStatus?.startsWith("비")
                      ? "높음"
                      : weatherStatus?.startsWith("소나기")
                      ? "매우 높음"
                      : weatherStatus?.startsWith("빗방울")
                      ? "낮음"
                      : "매우 낮음"}
                  </Text>
                </View>
                <View
                  style={{
                    gap: 5,
                  }}
                >
                  <Text
                    style={Font({
                      size: 12,
                      color: "#8592c5",
                      weight: Pretendard[500],
                    })}
                  >
                    습도
                  </Text>
                  <Text
                    style={Font({
                      size: 18,
                      color: "#1a2962",
                      weight: Pretendard[600],
                    })}
                  >
                    {weather["습도"]}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: 24,
                },
              ]}
            >
              호우 관련 상황 요청하기
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 24,
              }}
            >
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  },
                ]}
              >
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={require("../../assets/images/list/alert.png")}
                />
                <Text
                  style={Font({
                    size: 14,
                    color: "#1a2962",
                    weight: Pretendard[500],
                  })}
                >
                  관련 사고{"\n"}
                  <Text
                    style={Font({
                      size: 14,
                      weight: Pretendard[600],
                    })}
                  >
                    즉시 제보하기
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  styles.content,
                  {
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  },
                ]}
              >
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={require("../../assets/images/list/medical.png")}
                />
                <Text
                  style={Font({
                    size: 14,
                    color: "#1a2962",
                    weight: Pretendard[500],
                  })}
                >
                  사고 관련 구호{"\n"}
                  <Text
                    style={Font({
                      size: 14,
                      weight: Pretendard[600],
                    })}
                  >
                    물품 요청하기
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Text style={styles.title}>현재 피해 상황</Text>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 12,
                  backgroundColor: "#ffffff",
                  gap: 4,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={Font({
                    size: 16,
                    weight: Pretendard[500],
                    lineHeight: 24,
                    color: "#8592c5",
                  })}
                >
                  전국
                </Text>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require("../../assets/images/list/down.png")}
                />
              </View>
            </View>
            <Search />
            <View
              style={{
                gap: 18,
                marginTop: 18,
                marginBottom: 130,
              }}
            >
              {detail?.breaking?.map((v, i) => (
                <Content
                  key={i}
                  title={v.title}
                  subTitle={v.time}
                  content={v.content.slice(0, 17) + "..."}
                  onPress={() =>
                    props.navigation.navigate("Detail", {
                      ...v,
                    })
                  }
                  image={Math.random() > 0.5 ? 1 : 2}
                />
              ))}
            </View>
          </ScrollView>
          <BottomNav enabled="List" navigation={props.navigation} />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inner: {
    height: "100%",
    piosition: "relative",
    backgroundColor: "#F4F7FF",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
  },
  title: Font({
    size: 18,
    weight: Pretendard[600],
    color: "#000000",
  }),
});
