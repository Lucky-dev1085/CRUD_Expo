import React, { Component, Fragment } from "react";
import { ImageBackground, Alert, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import AppLogo from "../../components/AppLogo";
import { withFirebaseHOC } from "../../config/Firebase";

import styles from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters ")
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordVisibility: true,
      rightIcon: "ios-eye"
    };
  }

  componentDidMount () {

  };

  componentWillUnmount() {
    
  }

  goToForgotPassword = () => this.props.navigation.navigate("ForgotPassword");

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleOnLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      const response = await this.props.firebase.loginWithEmail(
        email,
        password
      );

      if (response.user) {
        this.props.navigation.navigate("App");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    const { passwordVisibility, rightIcon } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/background.jpg")}
          style={styles.image}
        >
          <HideWithKeyboard style={styles.logoContainer}>
            <AppLogo />
          </HideWithKeyboard>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              // console.log("values = ", values);
              this.handleOnLogin(values, actions);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting
            }) => (
              <View>
                <FormInput
                  name="email"
                  value={values.email}
                  leftIcon={{
                    type: "font-awesome",
                    name: "envelope",
                    color: "#000"
                  }}
                  iconName="ios-mail"
                  onChangeText={handleChange("email")}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  onBlur={handleBlur("email")}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name="password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Enter password"
                  secureTextEntry={passwordVisibility}
                  iconName="ios-lock"
                  onBlur={handleBlur("password")}
                  rightIcon={
                    <TouchableOpacity
                      onPress={this.handlePasswordVisibility}
                      style={{ backgroundColor: "rgba(52, 52, 52, 0.0)" }}
                    >
                      <Ionicons
                        name={rightIcon}
                        size={28}
                        color="#000"
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    type="submit"
                    onPress={handleSubmit}
                    title="LOGIN"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </View>
            )}
          </Formik>
          <Button
            title="Forgot Password?"
            onPress={this.goToForgotPassword}
            titleStyle={{ color: "#15364e" }}
            type="clear"
          />
        </ImageBackground>
      </View>
    );
  }
}

Login.navigationOptions = { headerShown: false };

export default withFirebaseHOC(Login);
