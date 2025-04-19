import React, { Fragment, useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
// import { Text, View, SafeAreaView, Image } from "react-native";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from "@app/i18n/i18n";
import { Images, Metrics } from "@app/theme";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Animated, { FadeIn, FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useAuth } from "@app/modules/components/context/AuthContext";
import { useLogin } from "@app/hooks/book.hook";
import storage from "../../../libs/storage";
import { storageKeys } from "../../../libs/constants";


const Login = (props) => {

  const navigation = useNavigation();
  const fetchLogin = useLogin();

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { updateUser } = useAuth();

  const { isDarkTheme } = useTheme();

  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);
  useEffect(() => {
    const onChange = ({ window }) => setDimensions(window);
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleClose = () => {
    props.closeLogin();
  }

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      console.log('login ----- : ', JSON.stringify(data.idToken));
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
      await auth().signInWithCredential(googleCredential);

      const user = auth().currentUser;
      const freshToken = await user.getIdToken(true);
      console.log('user: ', JSON.stringify(user));
      const responeLogin = await fetchLogin.mutateAsync({ token: freshToken });
      if (responeLogin.status === 'success') {
        console.log('responeLogin: ', JSON.stringify(responeLogin));
        storage.set(storageKeys.ACCESS_TOKEN, responeLogin.data.token)
      } else {
        await GoogleSignin.signOut();
        await auth().signOut();
      }
      updateUser();
      handleClose();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Người dùng hủy đăng nhập');
      } else {
        console.error(error);
      }
    }
  };


  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
            <Animated.View
              entering={FadeInLeft}
              exiting={FadeOutLeft}
              style={[styles.container, { paddingTop: insets.top }]}
            >
              <View style={styles.header}>
                <TouchableOpacity style={styles.btnClose} onPress={handleClose}>
                  <Image source={Images.icClose} style={styles.icClose} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <TouchableOpacity style={styles.btnLogin} onPress={signInWithGoogle}>
                  <Image source={Images.icGoogle} style={styles.icLarge} />
                  <Text style={styles.btnLoginText}>{i18n.t(`login.withGoogle`)}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};



export default Login;
