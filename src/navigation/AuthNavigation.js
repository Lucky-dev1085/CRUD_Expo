import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default AuthNavigation;