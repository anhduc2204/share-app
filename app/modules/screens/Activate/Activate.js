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
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from "@app/i18n/i18n";
// import { Colors as Themes, Images, Metrics } from "@app/theme";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Footer from "../../components/view/Footer";
import auth from '@react-native-firebase/auth';
import Login from "../Login/Login";
import LoginRequest from "../Login/LoginRequest";
import { useAuth } from "@app/modules/components/context/AuthContext";
import storage from "../../../libs/storage";
import { storageKeys } from "../../../libs/constants";
import { Colors as Themes, Images, Metrics } from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import DropdownElement from "../../components/element/DropdownElement";
import { createPost } from "../../../service/postService";
import { getUserRequests, updateRequestComplete } from "../../../service/requestService";
import { FlatList } from "react-native-gesture-handler";
import NewChatButton from "../../components/view/NewChatButton/NewChatButton";

const Activate = (props) => {

  const navigation = useNavigation();

  const { user, updateUser } = useAuth();

  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const [isLoginRequest, setIsLoginRequest] = useState(true);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('login');
      setIsLoginRequest(false);
    } else {
      console.log('un login');
      setIsLoginRequest(true);
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [])

  const loadData = async () => {
    const response = await getUserRequests(user.uid, true)
    console.log('response request: ', response);
    setData(response);
  }


  const showLogin = () => {
    setIsShowLogin(true);
  }
  const closeLogin = () => {
    setIsShowLogin(false);
  }

  const handleCompleteRequest = async (item) => {
    setIsLoading(true);
    await updateRequestComplete(item.id);
    await loadData();
    setIsLoading(false);
  }


  const renderCard = (item, index) => (
    <View style={styles.cardView} key={`card${index}`}>
      <View style={styles.postInfoView}>
        <Image source={Images.icDefaultImage} style={styles.requestImage} />
        <View style={styles.postInfoRight}>
          <Text style={styles.postTitle} numberOfLines={1}>{item.postTitle}</Text>
          <Text style={styles.postDesc}>{item.postDesc}</Text>
          <Text style={styles.postUsername}>Người đăng: {item.ownerName}</Text>
        </View>
      </View>
      <View style={styles.requestContent}>
        <Text style={styles.contenLabel}>Nội dung:</Text>
        <Text style={styles.contentText}>{item.message}</Text>
        <View style={styles.statusView}>
          <Text style={styles.statuslabel}>Trạng thái yêu cầu: </Text>
          <Text style={styles.contentText}>{item.status === 'pending' ? 'Đang chờ' : (item.status === 'progressing' ? 'Đang tiến hành' : 'Kết thúc')}</Text>
        </View>
        <View style={styles.statusView}>
          <Text style={styles.statuslabel}>Trạng thái phản hồi: </Text>
          <Text style={[styles.contentText, { color: '#000080' }]}>{!item.responseStatus ? '' : (item.responseStatus === 'accepted' ? 'Đã chấp nhận' : 'Từ chối')}</Text>
        </View>
        {item.responseStatus === 'accepted' &&
          <View style={styles.cardFooter}>
            <NewChatButton otherUserId={item.ownerId} otherUserName={item.ownerName} />
            {item.status !== 'completed' &&
              <TouchableOpacity style={styles.contactNowBtn} onPress={() => handleCompleteRequest(item)}>
                {isLoading ? (
                  <ActivityIndicator size={'small'} color={'#ffffff'} />
                ) : (
                  <Text style={styles.contactNowText}>Hoàn thành</Text>
                )}
              </TouchableOpacity>
            }
          </View>
        }
        {/* <Text style={styles.statuslabel}>Nội dung phản hồi:</Text>
        <Text style={styles.contentText}>{item.responseMessage ? item.responseMessage : ''}</Text> */}
      </View>
    </View >
  )

  const renderContent = () => (
    <View style={styles.content}>
      <ScrollView>
        <View style={styles.scrollContent}>
          {data.map((item, index) => (
            renderCard(item, index)
          ))}
        </View>
      </ScrollView>
    </View>
  )
  const renderHeader = (insets) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.btnHeader} onPress={() => navigation.goBack()}>
        <Image source={Images.icArrowLeft} style={styles.icBack} />
      </TouchableOpacity>
      <View style={[styles.titleView, { top: insets.top }]}>
        <Text style={styles.titleText}>Hoạt động</Text>
      </View>
    </View>
  )

  const renderBody = (insets) => (
    <View style={styles.body}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {renderHeader(insets)}
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  )

  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
            <View style={[styles.container]} >
              {!user ? <LoginRequest showLogin={showLogin} /> : renderBody(insets)}
              <Footer screen={'Activate'} />
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



export default Activate;
