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

const saveData = async (name, results) => {
  await Promise.all(
    results.map(async (result) => {
      let keys = Object.keys(result).join(",");
      let values = Object.values(result)
        .join('","')
        .replace("don't", "do not")
        .replace("doesn't", "does not")
        .replace("can't", "can not");

      let sqlInsert = "INSERT INTO " + name;
      let queryInsert = sqlInsert + " (" + keys + ') values ("' + values + '")';

      let sqlReplace = "REPLACE INTO " + name;
      let queryReplace =
        sqlReplace + " (" + keys + ') values ("' + values + '")';

      const tx = await new Promise((resolve) => db.transaction(resolve));

      await new Promise((resolve, reject) =>
        tx.executeSql(
          queryInsert,
          [],
          (tx, results) => {
            console.log("++ = ", queryInsert);
            resolve();
          },
          (t, error) => {
            tx.executeSql(
              queryReplace,
              [],
              (tx, results) => { 
                console.log("-- = ", queryReplace);
                resolve();
              },
              (t, error) => {
                console.log({ replace: error });
              }
            );
          }
        )
      );
    })
  );
};

Loading.navigationOptions = { headerShown: false };
