import { View, StyleSheet, SafeAreaView } from "react-native";
import GoogleMap from "../../components/GoogleMap";
import { Props as NaviProps } from "../../@types/predefined";
import Button from "../../components/Button/Icon";
import { icons } from "../../@types/images";
import Search from "../../components/Search";
import Modal from "../../components/Modal";
import { useState } from "react";
import safearea from "../../@types/safearea";
import BottomModal from "../../components/Slide/BottomModal";
import BottomNav from "../../components/BottomNav";

type Props = {} & NaviProps.TabNavigation;

export default function Main(props: Props) {
  const [modal, setModal] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);

  const [click, onClick] = useState(false);

  return (
    <>
      {modal && <Modal onPress={() => setModal(false)} />}
      <SafeAreaView style={safearea.SafeArea}>
        <BottomNav enabled="Main" navigation={props.navigation} />
        <View style={styles.inner}>
          <GoogleMap
            click={click}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
            }}
          />
          <View style={styles.searchBox}>
            <Search
              style={{
                width: "100%",
              }}
            />
          </View>
          <Button
            style={{
              position: "absolute",
              bottom: 28 + 76,
              left: 20,
            }}
            image={"call"}
            onPress={() => setModal(true)}
            enabled={modal}
          />
          <Button
            style={{
              position: "absolute",
              bottom: 92 + 76,
              left: 20,
            }}
            image={"pen"}
            onPress={() => {}}
          />
          <Button
            style={{
              position: "absolute",
              bottom: 28 + 76,
              right: 20,
            }}
            image={"location"}
            onPress={() => onClick(!click)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inner: {
    height: "100%",
    position: "relative",
  },
  content: {
    height: "100%",
    paddingBottom: 76,
    position: "relative",
  },
  searchBox: {
    position: "absolute",
    top: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
});
