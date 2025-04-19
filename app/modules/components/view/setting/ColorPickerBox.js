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
import Animated, { FadeInDown, SlideOutDown } from "react-native-reanimated";
import { Images, Metrics, Colors as Themes } from "../../../../theme";
import SmoothSliderElement from "../../element/SmoothSliderElement";
import { useReader } from "@app/modules/components/context/ReaderContext";
// import { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";


const ColorPickerBox = (props) => {

  const { textStyle, backgroundStyle } = useReader();

  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  // const renderPicker = () => (
  //   // <ColorPicker>
  //   // </ColorPicker>
  // )


  return (
    <GestureHandlerRootView >
      <Animated.View
        entering={FadeInDown.duration(300)}
        exiting={SlideOutDown.duration(300)}
        style={[styles.colorPickerContainer]}
      >
        {/* {renderPicker()} */}

      </Animated.View>
    </GestureHandlerRootView>
  );
};



export default React.memo(ColorPickerBox);
