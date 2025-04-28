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
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import Login from "../Login/Login";
import Footer from "@app/modules/components/view/Footer";
import i18n from "@app/i18n/i18n";
import { useGetDashboard } from "../../../hooks/book.hook";
import FastImage from 'react-native-fast-image';
import { IMAGE_DOMAIN } from "../../../config/constants";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import { getAllPost } from "../../../service/postService";
import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutUp } from "react-native-reanimated";
import { Images, Colors as Themes } from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import { sendRequest } from "../../../service/requestService";
import { useAuth } from "../../components/context/AuthContext";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Overview = (props) => {

  const navigation = useNavigation();
  const { user, updateUser, isLoadedUser } = useAuth();


  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [requestPost, setRequestPost] = useState(undefined);
  const [isSending, setIsSending] = useState(false);
  const [messageAlert, setMessageAlert] = useState(undefined)

  const inputRef = useRef(null);

  useEffect(() => {
    if (isLoadedUser) {
      setIsLoading(true);
      loadData();
    }
  }, [user, isLoadedUser])

  useEffect(() => {
    if (messageAlert) {
      const timeout = setTimeout(() => {
        setMessageAlert(undefined);
      }, 2500)

      return () => clearTimeout(timeout);
    }
  }, [messageAlert])

  const loadData = async () => {
    const response = await getAllPost();
    // console.log('all post : ------ ', response);
    if (user) {
      const filter = response.filter(post => !post.requesterList?.includes(user.uid));
      setData(filter);
    } else {
      setData(response);
    }
    setIsLoading(false);
  }

  const onRefresh = () => {
    setIsLoading(true);
    loadData();
  }

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      requestMessage: 'Mình có nhu cầu nhận đồ, rất mong được trợ giúp!'
    },
  });

  const handleSend = async (input) => {
    setIsSending(true);
    const requestModel = {
      postId: requestPost.id,
      postTitle: requestPost.title,
      postDesc: requestPost.description,
      postImage: requestPost.images[0] || [],
      requesterId: user.uid,
      ownerName: requestPost.userName,
      requesterName: user.displayName,
      ownerId: requestPost.userId,
      message: input.requestMessage,
    }
    const response = await sendRequest(requestModel, requestPost);
    if (response) {
      setData(prev => prev.filter(post => post.id !== requestPost.id));
      setMessageAlert('Gửi yêu cầu thành công!')
    } else {
      setMessageAlert('Gửi yêu cầu thất bại!')
    }
    setIsSending(false);
    closePopupRequest();
    console.log(response);
  }

  const showPopupRequest = (item) => {
    if (user) {
      setRequestPost(item);
    }
  }
  const closePopupRequest = () => {
    setRequestPost(undefined);
  }

  const renderTextInput = (name) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur } }) => (
        <View style={[
          styles.inputBox,
          // (errorMessage === name || (errorMessage !== "" && value === "")) ? { borderColor: Colors.warning } : {},
          // inputFocus === name ? { borderColor: Colors.success } : {}
        ]}>
          {/* <View style={styles.lableIcon}>
            <Image source={Images[name]} style={styles.icInput} />
          </View> */}
          <TextInput
            ref={inputRef}
            style={[styles.textInput, { textAlignVertical: 'top' }]}
            placeholder={'Nhập nội dung'}
            placeholderTextColor={Colors.textGrey}
            onBlur={onBlur}
            // onFocus={() => setInputFocus(name)}
            // secureTextEntry={name === 'password' ? !isShowPassword : false}
            onChangeText={(text) => {
              onChange(text);
            }}

            value={value}
            disableFullscreenUI={true}
            multiline={true}
            numberOfLines={3}
          />
        </View>
      )}
    />
  )

  const renderHeader = (insets) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      {/* <View style={styles.inputSearchView}>
        <Image source={Images.icSearch} style={styles.icSearch} />
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor={Colors.textGrey}
          style={styles.inputText}
        />
      </View> */}
      <TouchableOpacity style={styles.btnAlert} onPress={() => navigation.navigate('Notification')}>
        <Image source={Images.icBell} style={styles.icBell} />
        {/* <Text style={styles.textFooter}></Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnProfile} onPress={() => navigation.navigate('Profile')}>
        <Image source={Images.icUser} style={styles.icMedium} />
        {/* <Text style={styles.textFooter}></Text> */}
      </TouchableOpacity>
    </View>
  )

  const renderItem = (item) => (
    <View style={styles.itemView}>
      <View style={styles.itemHeader}>
        <Image style={styles.imageUser} source={Images.icAccount} />
        <Text style={styles.userName}>{item.userName}</Text>
      </View>
      <View style={styles.imageView}>
        <Image source={Images.icDefaultImage} style={styles.itemImage} resizeMode="contain" />
        <Image source={Images.icDefaultImage} style={styles.itemImage} resizeMode="contain" />
        <Image source={Images.icDefaultImage} style={styles.itemImage} resizeMode="contain" />
      </View>
      <View style={styles.itemInfoView}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDesc}>{item.description}</Text>
        <Text style={styles.itemContact}>Liên hệ: {item.phoneNumber || ''}</Text>
        <Text style={styles.itemAddress}>Vị trí: 264/47 Ngọc Thụy, Long Biên</Text>
      </View>
      <View style={styles.itemFooter}>
        {user && item.userId === user.uid ? (
          <TouchableOpacity style={styles.btnSendRequest} onPress={() => navigation.navigate('Notification')}>
            <Text style={styles.btnSendRequestText}>{item.requestCount} lượt gửi yêu cầu</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnSendRequest} onPress={() => showPopupRequest(item)}>
            <Text style={styles.btnSendRequestText}>Gửi yêu cầu nhận</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity style={styles.btnSave}>
          <Image source={Images.icChat} style={styles.icStar} />
        </TouchableOpacity> */}

      </View>

    </View>
  )

  const renderContent = () => (
    <View style={styles.content}>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          renderItem(item)
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }

      />
    </View>
  )

  const renderPopupSendRequest = () => (
    <AnimatedPressable
      onPress={closePopupRequest}
      style={styles.backdrop}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(300)}
    >
      <Animated.View
        entering={FadeInUp.duration(300)}
        exiting={FadeOutUp.duration(300)}
        style={styles.popuppView}
      >
        <View style={styles.postInfoView}>
          <Image source={Images.icDefaultImage} style={styles.requestImage} />
          <View style={styles.postInfoRight}>
            <Text style={styles.postTitle} numberOfLines={1}>{requestPost.title}</Text>
            <Text style={styles.postUsername}>Người đăng: {requestPost.userName}</Text>
          </View>
        </View>
        <View style={styles.requestContent}>
          <Text>Nội dung</Text>
          {renderTextInput('requestMessage')}

          <TouchableOpacity style={styles.btnPopup} onPress={handleSubmit(handleSend)}>
            {isSending ? (
              <ActivityIndicator size={'small'} color={'#ffffff'} />
            ) : (
              <Text style={styles.btnPopupText}>Gửi</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>

    </AnimatedPressable>
  )

  const renderMessageAlert = () => (
    <View style={styles.messageAlertView}>
      <Text style={styles.messageAlertText}>{messageAlert}</Text>
    </View>
  )

  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.container}>
              {renderHeader(insets)}
              {renderContent()}
              <Footer screen={'Overview'} />
              {/* {isShowLogin && <Login />} */}
              {requestPost && renderPopupSendRequest()}
              {messageAlert && renderMessageAlert()}
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};



export default Overview;
