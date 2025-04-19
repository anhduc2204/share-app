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
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from "../../../i18n/i18n";
import { Colors as Themes, Images, Metrics } from "../../../theme";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Footer from "../../components/view/Footer";
import { useAuth } from "@app/modules/components/context/AuthContext";
import createStyles from "./styles";
import { CATEGORY } from "@app/config/filter";
import { GestureHandlerRootView, PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useGetCategoryList, useGetHashtagList, useGetListBookFilter } from "../../../hooks/book.hook";
import FilterSection from "./FilterSection";
import FastImage from "react-native-fast-image";
import { IMAGE_DOMAIN } from "../../../config/constants";
import { fomartTime, getParamFilter } from "../../../libs/utils";
import { ActivityIndicator } from "react-native";

const BookListSection = ({ page, categorySelected, hashTagSelected, statusSelected }) => {

  const navigation = useNavigation();
  const filterParams = useMemo(() => getParamFilter({
    categorySelected,
    hashTagSelected,
    page: page,
    page_size: 10
  }), [categorySelected, hashTagSelected]);

  const { data, isFetching } = useGetListBookFilter(filterParams);

  const [bookData, setBookData] = useState(undefined);

  useEffect(() => {
    if (data) {
      console.log('data ', page, ' - ', JSON.stringify(data.data.length));
      setBookData(data);
    }
  }, [data]);


  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const handleClickItemSearch = (item) => {
    const data = {
      item: item
    }
    // setIsLoading(false);
    navigation.navigate('BookDetail', data);
  }

  return (
    <View style={styles.FilterResultSection}>
      {!data ? (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={Colors.blue_bland} />
        </View>
      ) : (
        data.data.map((item, index) => (
          <TouchableOpacity style={styles.itemView}
            onPress={() => handleClickItemSearch(item)}
            key={`result${index}`}
          >
            <View style={styles.imageView}>
              <FastImage
                style={item.image === null ? styles.imageDefault : styles.imageItem}
                source={item.image === null ? Images.icDefaultImage : { uri: `${IMAGE_DOMAIN}${item.image}` }}
                resizeMode={item.image === null ? FastImage.resizeMode.contain : FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.title}</Text>
              <View style={styles.quoteView}>
                <Image source={Images.icView} style={styles.icView} />
                <Text style={[styles.quoteText, styles.viewText]}>{item.total_view}</Text>
                <Image source={Images.icStar} style={styles.icStarNormal} />
                <Text style={[styles.quoteText, styles.ratingText]}>{item.rating}</Text>
              </View>
              <View style={styles.totalChapterView}>
                <Text style={styles.totalChapterText}>{item.total_chapter} chương</Text>
                <Text style={styles.updateTime}>{fomartTime(item.updated_at)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}

    </View>
  );
};



export default React.memo(BookListSection);
