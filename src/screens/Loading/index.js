import React, { Component } from "react";
import { ImageBackground, Text, View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { NavigationActions } from "react-navigation";
import styles from "./styles";

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingStatus: "loading",
      inspectionList: [],
    };
  }

  componentDidMount = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "Login",
        params: {},
        action: NavigationActions.navigate({
          routeName: "Login",
        }),
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/splash.png")}
          style={styles.image}
        >
          <Text style={styles.loadingStatus}>{this.state.loadingStatus}</Text>
        </ImageBackground>

        <DropdownAlert
          ref={(ref) => (this.dropDownAlertRef = ref)}
          closeInterval={6000}
        />
      </View>
    );
  }
}

Loading.navigationOptions = { headerShown: false };
