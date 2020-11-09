import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingStatus: {
    backgroundColor: "rgba(255,255,255, .5)",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    position: "absolute",
    bottom: 100,
    color: "#000",
    fontSize: 15,
    alignItems: "center",
    alignSelf: "center",
    textTransform: "lowercase"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
