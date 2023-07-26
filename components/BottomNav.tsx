import { StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { menus } from "../@types/menus";
import { Props as NaviProps } from "../@types/predefined";

type Props = {
  enabled: (typeof menus)[number]["path"];
} & NaviProps.TabNavigation;

export default function BottomNav(props: Props) {
  return (
    <>
      <View style={styles.container}>
        {menus.map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => props.navigation.navigate(v.path)}
          >
            <Image
              style={{
                width: 32,
                height: 32,
              }}
              source={v.path === props.enabled ? v.enabled_image : v.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 22,
    flexDirection: "row",
    gap: 70,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    zIndex: 1001,
  },
});
