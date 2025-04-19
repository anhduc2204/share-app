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
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import Login from "../Login/Login";
import { Colors as Themes, Images, Metrics } from "@app/theme";
import Footer from "@app/modules/components/view/Footer";
import i18n from "@app/i18n/i18n";
import { useGetDashboard } from "../../../hooks/book.hook";
import FastImage from 'react-native-fast-image';
import { IMAGE_DOMAIN } from "../../../config/constants";
import { useTheme } from "@app/modules/components/context/ThemeContext";


const Overview = (props) => {

  const navigation = useNavigation();


  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);


  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.container}>
              {renderHeader(insets)}
              {renderContent()}
              <Footer />
              {/* {isShowLogin && <Login />} */}
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};



export default Overview;
