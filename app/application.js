import { enableScreens } from "react-native-screens";
enableScreens();
import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking, Alert, Platform } from 'react-native'
import storage from "@app/libs/storage";
import i18n from "@app/i18n/i18n";
import { ThemeProvider } from "./modules/components/context/ThemeContext";
import { OrientationProvider } from "./modules/components/context/OrientationContext";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./libs/RootNavigation";
import FlashMessage from "react-native-flash-message";
import { WEB_CLIENT_ID } from "./config/keys";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AuthProvider } from "./modules/components/context/AuthContext";
import AddUser from "./modules/screens/AddUser/AddUser";
import UserListScreen from "./modules/screens/UserList/UserList";


const Application = (props) => {
  const Stack = createNativeStackNavigator();

  useEffect(async () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, [])

  useEffect(async () => {
    // startBackgroundFetch();
    const language = await storage.get('language');
    if (language) {
      i18n.locale = language;
    } else {
      i18n.locale = 'vi';
    }
  }, [])

  useEffect(async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      console.log('applinks: ', url);
    } else {
      console.log(' no applinks: ');
    }
  }, []);

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <Fragment>
          <ThemeProvider>
            <OrientationProvider>
              <AuthProvider>
                <NavigationContainer ref={navigationRef}>
                  {
                    <Stack.Navigator
                      initialRouteName="UserListScreen"
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen name="AddUser" component={AddUser} />
                      <Stack.Screen name="UserListScreen" component={UserListScreen} />
                      {/* <Stack.Screen name="UserList" component={Notification} /> */}
                    </Stack.Navigator>
                  }
                  <FlashMessage position="top" style={{ marginTop: 16 }} />
                </NavigationContainer>
              </AuthProvider>
            </OrientationProvider>
          </ThemeProvider>
        </Fragment>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
