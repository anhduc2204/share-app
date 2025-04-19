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
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from "@app/i18n/i18n";
import Animated, { FadeInDown, SlideOutDown } from "react-native-reanimated";
import { Images, Metrics, Colors as Themes } from "../../../../theme";
import SmoothSliderElement from "../../element/SmoothSliderElement";
import { useReader } from "@app/modules/components/context/ReaderContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FONTS } from "@app/config/setting";


const FontsPickerBox = ({ handleClose }) => {

  const { textStyle, backgroundStyle, applyFontFamily } = useReader();

  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  // const renderPicker = () => (
  //   // <ColorPicker>
  //   // </ColorPicker>
  // )

  const handleSelectFont = (font) => {
    applyFontFamily(font)
  }

  const renderHeaderPicker = () => (
    <View style={styles.headerPicker}>
      <TouchableOpacity style={styles.btnBack} onPress={handleClose}>
        <Image source={Images.icArrowLeft} style={styles.icBack} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Kiểu Chữ</Text>
    </View>
  )

  const renderListFont = () => (
    <ScrollView >
      <View style={styles.listFont}>
        {FONTS.map((item, index) => (
          <>
            <TouchableOpacity
              style={styles.itemFontBtn}
              onPress={() => handleSelectFont(item)}
            >
              <Text style={[
                styles.itemFontText,
                { fontFamily: item }
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
          </>
        ))}
      </View>
    </ScrollView>
  )


  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={SlideOutDown.duration(300)}
      style={[styles.pickerContainer]}
    >
      {renderHeaderPicker()}
      {renderListFont()}
    </Animated.View>
  );
};



export default React.memo(FontsPickerBox);
