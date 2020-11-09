import React, { Component, Fragment } from "react";
import { Text, ScrollView, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import AppLogo from "../../components/AppLogo";

import styles from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email")
});

class ForgotPassword extends Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      await this.props.firebase.passwordReset(email);
      console.log("Password reset email sent successfully");
      this.props.navigation.navigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo />
        </HideWithKeyboard>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions);
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
            <Fragment>
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#830000"
                onBlur={handleBlur("email")}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <View style={styles.buttonContainer}>
                <FormButton
                  onPress={handleSubmit}
                  title="Send Email"
                  disabled={!isValid || isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

export default ForgotPassword;
