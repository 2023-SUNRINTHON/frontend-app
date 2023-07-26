import { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import { Icons, icons } from "../../@types/images";

type Props = {
  onPress: () => void;
  image: keyof Icons;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Button(props: Props) {
  const { onPress, image, enabled, style } = props;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Image
          style={{
            width: 26,
            height: 26,
          }}
          source={icons[image][enabled ? 1 : 0]}
          placeholder={blurhash}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderColor: "#dadada",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    padding: 12,
  },
});
