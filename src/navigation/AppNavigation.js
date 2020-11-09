import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login";
import Loading from "../screens/Loading";

const AppNavigation = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { headerShown: false } },
    Loading: { screen: Loading, navigationOptions: { headerShown: false } }
  },
  {
    initialRouteName: "Loading",
    headerMode: "none"
  }
);

export default AppNavigation;
