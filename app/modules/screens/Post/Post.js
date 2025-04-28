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

const Post = (props) => {

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

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const productNameInputRef = useRef(null);
  const phoneNumberInputRef = useRef(null);

  const getCategories = () => {
    return [
      { label: 'Quần áo', value: { categoryId: 1, categoryName: 'Quần áo' } },
      { label: 'Phụ kiện', value: { categoryId: 1, categoryName: 'Phụ kiện' } },
      { label: 'Đồ ngủ (chăn, gối,...)', value: { categoryId: 2, categoryName: 'Đồ ngủ' } },
      { label: 'Đồ bếp', value: { categoryId: 3, categoryName: 'Đồ bếp' } },
      { label: 'Đồ dùng khác', value: { categoryId: 3, categoryName: 'Đồ dùng khác' } }
    ]
  }

  const getCategory = (categoryName) => {
    const categoriesFilter = categories.filter(category => category.value.categoryName === categoryName);
    return categoriesFilter[0]
  }

  const categories = useMemo(getCategories, []);


  const showLogin = () => {
    setIsShowLogin(true);
  }
  const closeLogin = () => {
    setIsShowLogin(false);
  }

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      // userId: '',
      title: '',
      description: '',
      // productName: '',
      category: categories[0],
      phoneNumber: ''
    },
  });

  const handleSave = (input) => {
    setIsLoading(true);
    if (validateInput(input)) {
      postData(input);
    }
  }
  const validateInput = (input) => {
    if (!input.title || !input.description || !input.phoneNumber) {
      console.log('thiếu thông tin');
      return false;
    }
    return true;
  }

  const resetInput = () => {
    reset({
      // userId: '',
      title: '',
      description: '',
      productName: '',
      category: categories[0],
    })
  }

  const postData = async (input) => {
    console.log('post : ', input);
    const postParam = {
      userId: user.uid,
      userName: user.displayName,
      title: input.title,
      description: input.description,
      // productName: input.productName,
      phoneNumber: input.phoneNumber.toString(),
      category: input.category.value.categoryName,
      images: [],
      location: {
        address: '',
        coordinates: {
          latitude: 0,
          longitude: 0,
        }
      }
    }
    try {
      const response = await createPost(postParam);
      console.log('post id created: ', response);
      resetInput();
      setIsLoading(false);
    } catch (error) {
      Alert.alert(
        'Thông báo',
        error.message,
        [
          'Oke',
        ]
      );
    }
  }

  const renderTextInput = (name, placeholder, ref) => (
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
            ref={ref}
            style={[styles.textInput, { textAlignVertical: name === 'description' ? 'top' : 'center' }]}
            placeholder={placeholder}
            placeholderTextColor={Colors.textGrey}
            onBlur={onBlur}
            keyboardType={name === 'phoneNumber' ? "numeric" : null}
            // onFocus={() => setInputFocus(name)}
            // secureTextEntry={name === 'password' ? !isShowPassword : false}
            onChangeText={(text) => {
              onChange(text);
            }}

            value={value}
            disableFullscreenUI={true}
            multiline={name === 'description'}
            numberOfLines={name === 'description' ? 5 : null}
          />
        </View>
      )}
    />
  )

  const renderPicker = (name, required) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.pickerBox}>
          <View style={styles.pickerLabel}>
            <Text style={styles.labelText}>Phân loại</Text>
            {/* {required && <Text style={styles.required}>*</Text>} */}
          </View>
          <View style={{ width: '50%', paddingBottom: Metrics.tiny }}>
            <DropdownElement
              value={value}
              data={categories}
              onChange={onChange}
            />
          </View>
        </View>
      )}
    />
  );

  const renderContent = () => (
    <View style={styles.content}>
      {renderTextInput('title', 'Tiêu đề', titleInputRef)}
      {/* {renderTextInput('productName', 'Tên sản phẩm', productNameInputRef)} */}
      {renderTextInput('description', 'Nội dung', descriptionInputRef)}
      {renderTextInput('phoneNumber', 'Số điện thoại', phoneNumberInputRef)}
      {renderPicker('category', true)}
      <TouchableOpacity style={styles.btnPost} onPress={handleSubmit(handleSave)} >
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          <Text style={styles.postText}>Chia sẻ</Text>
        )}
      </TouchableOpacity>
    </View>
  )
  const renderHeader = (insets) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.btnHeader} onPress={() => navigation.goBack()}>
        <Image source={Images.icArrowLeft} style={styles.icBack} />
      </TouchableOpacity>
      <View style={[styles.titleView, { top: insets.top }]}>
        <Text style={styles.titleText}>Bài đăng</Text>
      </View>
      {/* <TouchableOpacity style={styles.historyBtn}>
        <Text style={styles.historyText}>Lịch sử</Text>
      </TouchableOpacity> */}
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
              <Footer screen={'Post'} />
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



export default Post;
