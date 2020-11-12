import React, { Component } from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { Ionicons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import { withFirebaseHOC } from "../../config/Firebase";

import styles from "./styles";

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingStatus: "loading",
      inspectionList: [],
    };
  }

  componentDidMount = () => {
    // this.props.navigation.dispatch(
    //   NavigationActions.navigate({
    //     routeName: "Login",
    //     params: {},
    //     action: NavigationActions.navigate({
    //       routeName: "Login",
    //     }),
    //   })
    // );
    console.log("Loading screen");
  };

  handleSignOut = async() => {
    console.log("sign out");
    try {
      const response = await this.props.firebase.signOut();

      if (response) {
        this.props.navigation.navigate("Auth");
      }
    } catch (error) {
      console.log("general", error.message);
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/splash.png")}
          style={styles.image}
        >
          <Text 
            style={styles.loadingStatus} 
            onPress={this.handleSignOut}
          >
            {this.state.loadingStatus}
          </Text>
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

export default withFirebaseHOC(Loading);