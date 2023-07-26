import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import safearea from "../../@types/safearea";
import { Image } from "expo-image";
import { Props as NaviProps } from "../../@types/predefined";
import { Font, Pretendard } from "../../utils/font";
import { RouteProp } from "@react-navigation/native";
import { useMemo } from "react";

type Props = {
  route: RouteProp<RootStackParams, "Detail">;
} & NaviProps.TabNavigation;

export default function Detail(props: Props) {
  const { navigation, route } = props;
  const { content, title, time } = route.params;

  const score = useMemo(() => {
    if (content.includes("재해")) return 3;
    if (content.includes("매우")) return 3;
    if (content.includes("대피")) return 3;
    if (content.includes("피난")) return 3;
    if (content.includes("특보")) return 2;
    if (content.includes("유의")) return 2;
    return 1;
  }, [route.params]);

  return (
    <>
      <SafeAreaView style={safearea.SafeArea}>
        <ScrollView
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require("../../assets/images/detail/back.png")}
            />
          </TouchableOpacity>
          <Image
            style={{
              width: "100%",
              height: 340,
              zIndex: -1,
              marginBottom: 34,
            }}
            source={require("../../assets/images/mockup/sample1.png")}
          />
          <View
            style={{
              gap: 8,
              paddingHorizontal: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={Font({
                size: 14,
                color: "#8592C5",
                weight: Pretendard[600],
              })}
            >
              {time}
            </Text>
            <Text
              style={Font({
                size: 20,
                color: "#1a2962",
                weight: Pretendard[700],
              })}
            >
              {title}
            </Text>
            <Text
              style={Font({
                size: 14,
                color: "#8592C5",
                weight: Pretendard[600],
              })}
            >
              170,980명이 조회했어요
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              gap: 10,
              marginBottom: 40,
            }}
          >
            <View
              style={{
                gap: 10,
                flexDirection: "row",
              }}
            >
              <View style={styles.box}>
                <View
                  style={{
                    gap: 5,
                  }}
                >
                  <Text
                    style={Font({
                      size: 12,
                      color: "#8592C5",
                      weight: Pretendard[500],
                    })}
                  >
                    피해 크기
                  </Text>
                  <Text
                    style={Font({
                      size: 18,
                      color: "#1A2962",
                      weight: Pretendard[600],
                    })}
                  >
                    {score === 1 ? "작음" : score === 2 ? "보통" : "큼"}
                  </Text>
                </View>
                <Text
                  style={Font({
                    size: 12,
                    color: "#8592C5",
                    weight: Pretendard[700],
                  })}
                >
                  피해가{" "}
                  <Text
                    style={Font({
                      size: 12,
                      color: "#1a2962",
                      weight: Pretendard[700],
                    })}
                  >
                    {score === 1 ? "없어" : score === 2 ? "작아" : "상당해"}요
                  </Text>
                </Text>
              </View>
              <View style={styles.box}>
                <View
                  style={{
                    gap: 5,
                  }}
                >
                  <Text
                    style={Font({
                      size: 12,
                      color: "#8592C5",
                      weight: Pretendard[500],
                    })}
                  >
                    폭우량
                  </Text>
                  <Text
                    style={Font({
                      size: 18,
                      color: "#1A2962",
                      weight: Pretendard[600],
                    })}
                  >
                    270 ~ 300mm
                  </Text>
                </View>
                <Text
                  style={Font({
                    size: 12,
                    color: "#8592C5",
                    weight: Pretendard[700],
                  })}
                >
                  외출하기에{" "}
                  <Text
                    style={Font({
                      size: 12,
                      color: "#1a2962",
                      weight: Pretendard[700],
                    })}
                  >
                    {score === 1 ? "무난" : score === 2 ? "주의" : "위험"}해요
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                gap: 10,
                flexDirection: "row",
              }}
            >
              <View
                style={[
                  styles.box,
                  {
                    gap: 5,
                  },
                ]}
              >
                <Text
                  style={Font({
                    size: 12,
                    color: "#8592C5",
                    weight: Pretendard[500],
                  })}
                >
                  접근 가능 여부
                </Text>
                <Text
                  style={Font({
                    size: 18,
                    color: "#1A2962",
                    weight: Pretendard[600],
                  })}
                >
                  {score === 1 ? "가능" : score === 2 ? "주의" : "불가능"}
                </Text>
              </View>

              <View
                style={[
                  styles.box,
                  {
                    gap: 5,
                  },
                ]}
              >
                <Text
                  style={Font({
                    size: 12,
                    color: "#8592C5",
                    weight: Pretendard[500],
                  })}
                >
                  지하 시설 이용 가능 여부
                </Text>
                <Text
                  style={Font({
                    size: 18,
                    color: "#1A2962",
                    weight: Pretendard[600],
                  })}
                >
                  {score === 1 ? "가능" : score === 2 ? "주의" : "불가능"}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              gap: 12,
              marginBottom: 40,
            }}
          >
            <Text
              style={Font({
                size: 14,
                color: "#1a2962",
                weight: Pretendard[500],
              })}
            >
              상황 세부 설명
            </Text>
            <Text
              style={Font({
                size: 12,
                color: "#8592c5",
                weight: Pretendard[500],
              })}
            >
              {content}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              gap: 12,
              marginBottom: 20,
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
                  size: 14,
                  color: "#1a2962",
                  weight: Pretendard[500],
                })}
              >
                관련 외부 링크
              </Text>
              <Text
                style={Font({
                  size: 14,
                  color: "#1a2962",
                  weight: Pretendard[500],
                })}
              >
                링크 1
              </Text>
            </View>
            <Text
              style={Font({
                size: 14,
                color: "#8592c5",
                weight: Pretendard[500],
              })}
            >
              서울특별시 - https://mediahub.seoul.go.kr/
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 100,
    zIndex: 10,
  },
  box: {
    backgroundColor: "#f2f5ff",
    borderRadius: 12,
    padding: 14,
    flex: 1,
    gap: 15,
  },
});
