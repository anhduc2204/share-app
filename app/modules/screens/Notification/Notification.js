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
import { useNavigation, useRoute } from '@react-navigation/native';
import Footer from "../../components/view/Footer";
import auth from '@react-native-firebase/auth';
import Login from "../Login/Login";
import LoginRequest from "../Login/LoginRequest";
import { useAuth } from "@app/modules/components/context/AuthContext";
import { Colors as Themes, Images, Metrics } from "../../../theme";
import { getUserRequests, updateRequest } from "../../../service/requestService";
import createStyles from "./styles";
import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutUp } from "react-native-reanimated";
import { Pressable } from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Notification = ({ }) => {

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
  const [messageConfirm, setMessageConfirm] = useState(undefined);
  const [requestConfirm, setRequestConfirm] = useState(undefined);

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
    const response = await getUserRequests(user.uid, false)
    console.log('response request: ', response);
    setData(response);
  }


  const showLogin = () => {
    setIsShowLogin(true);
  }
  const closeLogin = () => {
    setIsShowLogin(false);
  }

  const handleAccept = async () => {
    setIsLoading(true);
    await updateRequest(requestConfirm.id, 'accept', '');
    await loadData();
    setIsLoading(false);
    closePopupConfirm();
  }
  const handleReject = () => {

  }

  const showPopupConfirm = (message, request) => {
    setMessageConfirm(message);
    setRequestConfirm(request);
  }
  const closePopupConfirm = () => {
    setMessageConfirm(undefined);
    setRequestConfirm(undefined);
  }

  const renderPopupConfirm = () => (
    <AnimatedPressable
      onPress={closePopupConfirm}
      style={styles.backdrop}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(300)}
    >
      <Animated.View
        entering={FadeInUp.duration(300)}
        exiting={FadeOutUp.duration(300)}
        style={styles.popuppView}
      >
        <View style={styles.popupContent}>
          <Text>{messageConfirm === 'accept' ? `Chấp nhận yêu cầu của ` : 'Từ chối yêu cầu của '}</Text>
          <Text style={styles.requesterName}>{requestConfirm.requesterName}</Text>
          <Text>?</Text>
        </View>
        <View style={styles.popupConfirmBtn}>
          <TouchableOpacity style={styles.popupBtnCancel} onPress={closePopupConfirm}>
            <Text style={styles.popupBtnAcceptText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popupBtnAccept}
            onPress={() => {
              if (messageConfirm === 'accept') {
                handleAccept();
              } else {
                handleReject();
              }
            }}
          >
            <Text style={styles.popupBtnAcceptText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </AnimatedPressable>
  )


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
        <View style={styles.requesterNameView}>
          <Text style={styles.requesterNameLabel}>Người gửi: </Text>
          <Text style={styles.requesterNameText}>{item.requesterName}</Text>
        </View>
        <Text style={styles.contenLabel}>Nội dung:</Text>
        <Text style={styles.contentText}>{item.message}</Text>
        <View style={styles.statusView}>
          <Text style={styles.statuslabel}>Trạng thái yêu cầu: </Text>
          <Text style={styles.contentText}>{item.status === 'pending' ? 'Đang chờ' : 'Kết thúc'}</Text>
        </View>
        {item.responseStatus ? (
          <View style={styles.statusView}>
            <Text style={styles.statuslabel}>Trạng thái phản hồi: </Text>
            <Text style={styles.contentText}>{item.responseStatus === 'accepted' ? 'Đã chấp nhận' : 'Từ chối'}</Text>
          </View>
        ) : (
          // <TouchableOpacity style={}>

          // </TouchableOpacity>
          <View style={styles.btnResponse}>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={'#ffffff'} />
            ) : (
              <>
                <TouchableOpacity style={styles.btnRejected} onPress={() => showPopupConfirm('reject', item)}>
                  <Text style={styles.btnResponseText}>Từ chối</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAccepted} onPress={() => showPopupConfirm('accept', item)}>
                  <Text style={styles.btnResponseText}>Chấp nhận</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        {/* <Text style={styles.statuslabel}>Nội dung phản hồi:</Text>
        <Text style={styles.contentText}>{item.responseMessage ? item.responseMessage : ''}</Text> */}
      </View>
    </View >
  )

  const renderContent = () => (
    <View style={styles.content}>
      {data.length <= 0 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Bạn chưa nhận được yêu cầu nào</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.scrollContent}>
            {data.map((item, index) => (
              renderCard(item, index)
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
  const renderHeader = (insets) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.btnHeader} onPress={() => navigation.goBack()}>
        <Image source={Images.icArrowLeft} style={styles.icBack} />
      </TouchableOpacity>
      <View style={[styles.titleView, { top: insets.top }]}>
        <Text style={styles.titleText}>Yêu cầu</Text>
      </View>
    </View>
  )

  const renderBody = (insets) => (
    <View style={styles.body}>
      {renderHeader(insets)}
      {renderContent()}
      {messageConfirm && renderPopupConfirm()}
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



export default Notification;
