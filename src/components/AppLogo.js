import React from "react";
import { Image } from "react-native-elements";

const AppLogo = () => (
  <Image
    source={require("../assets/logo.png")}
    resizeMode="contain"
    style={{ width: 300, height: 200 }}
  />
);

export default AppLogo;
