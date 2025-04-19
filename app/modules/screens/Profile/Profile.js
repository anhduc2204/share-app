import React, { Fragment, useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
// import { Text, View, SafeAreaView, Image } from "react-native";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from "@app/i18n/i18n";
import { Colors as Themes, Images, Metrics } from "@app/theme";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Footer from "../../components/view/Footer";
import auth from '@react-native-firebase/auth';
import Login from "../Login/Login";
import LoginRequest from "../Login/LoginRequest";
import { useAuth } from "@app/modules/components/context/AuthContext";
import storage from "../../../libs/storage";
import { storageKeys } from "../../../libs/constants";

const Profile = (props) => {

  const navigation = useNavigation();

  const { user, updateUser } = useAuth();

  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const [isLoginRequest, setIsLoginRequest] = useState(true);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('login');
      setIsLoginRequest(false);
    } else {
      console.log('un login');
      setIsLoginRequest(true);
    }
  }, [user])


  const showLogin = () => {
    setIsShowLogin(true);
  }
  const closeLogin = () => {
    setIsShowLogin(false);
  }

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      await storage.remove(storageKeys.ACCESS_TOKEN);
      updateUser();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('đăng xuất lỗi', error.message)
    }
  }

  const RenderContent = () => (
    <View style={styles.content}>
      <View style={styles.header}>
        <Image style={styles.image} source={Images.icAccount} />
        <Text style={styles.name}>{user.displayName}</Text>
      </View>
      <View style={styles.settingOption}>
        <TouchableOpacity style={styles.btnOption}>
          <Image style={styles.iconOptionItem} source={Images.icPremium} />
          <Text style={styles.optionText}>{i18n.t(`setting.premium`)}</Text>
          <Image style={styles.icArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.btnOption}>
          <Image style={styles.iconOptionItem} source={Images.icSetting} />
          <Text style={styles.optionText}>{i18n.t(`setting.setting`)}</Text>
          <Image style={styles.icArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
      </View>
      <View style={styles.settingOption}>
        <TouchableOpacity style={styles.btnOption}>
          <Image style={styles.iconOptionItem} source={Images.icEmail} />
          <Text style={styles.optionText}>{i18n.t(`setting.suport`)}</Text>
          <Image style={styles.icArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.btnOption}>
          <Image style={styles.iconOptionItem} source={Images.icDoc} />
          <Text style={styles.optionText}>{i18n.t(`setting.termsOfService`)}</Text>
          <Image style={styles.icArrowRight} source={Images.icArrowRight} />
        </TouchableOpacity>
      </View>
      <View style={styles.FooterView}>
        <TouchableOpacity style={styles.logoutBtn}
          onPress={() => {
            setIsLoading(true);
            handleLogout();
          }}>
          <Image style={styles.icLogout} source={Images.icLogout} />
          <Text style={styles.logoutText}>{i18n.t(`setting.logout`)}</Text>
        </TouchableOpacity>
        {isLoading &&
          <View style={styles.loadingView}>
            <ActivityIndicator size={'small'} color={Colors.blue_bland} />
          </View>
        }
      </View>
    </View>
  )

  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
            <View style={[styles.container, { paddingTop: insets.top }]} >
              {!user ? <LoginRequest showLogin={showLogin} /> : RenderContent()}
              <Footer />
              {isShowLogin &&
                <Login closeLogin={closeLogin} />
              }
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};



export default Profile;
