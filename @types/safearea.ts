import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
