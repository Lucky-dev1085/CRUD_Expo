import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCC"
  },
  imageContainer: {},
  logoContainer: {
    alignItems: "center",
    paddingTop: 125
  },
  buttonContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  eyeIcon: {
    padding: 10,
    marginLeft: 0,
    backgroundColor: "rgba(52, 52, 52, 0.0)"
  },
  image: {
    width: width,
    height: height
  }
});
