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
import FontsPickerBox from "./FontsPickerBox";
import { BACKGROUND_COLORS, TEXT_COLORS } from "../../../../config/setting";
// import ColorPickerBox from "./ColorPickerBox";


const InterfaceSetting = (props) => {

  const { textStyle, backgroundStyle, applyFontSize, applyBackgroundColor, applyTextColor } = useReader();

  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [isShowFontsPicker, setIsShowFontsPicker] = useState(false);

  const handleShowColorPicker = () => {
    setIsShowColorPicker(true);
  }
  const handleCloseColorPicker = () => {
    setIsShowColorPicker(false);
  }
  const handleShowFontsPicker = () => {
    setIsShowFontsPicker(true);
  }
  const handleCloseFontsPicker = () => {
    setIsShowFontsPicker(false);
  }

  const handleFontSizeChange = (isIncrease) => {
    applyFontSize(isIncrease ? textStyle.fontSize + 2 : textStyle.fontSize - 2);
  }
  const handleTextColorChange = (item) => {
    applyTextColor(item.color);
  }
  const handleBackgroundcolorChange = (item) => {
    applyBackgroundColor(item.backgroundColor);
  }
  const renderTextColors = () => (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.listColor}>
          {TEXT_COLORS.map((color, index) => (
            <TouchableOpacity
              key={`textColor${index}`}
              style={[
                styles.btnColor,
                { backgroundColor: color.color }
              ]}
              onPress={() => handleTextColorChange(color)}
            ></TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
  const renderBackgroundcolors = () => (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.listColor}>
          {BACKGROUND_COLORS.map((color, index) => (
            <TouchableOpacity
              key={`textColor${index}`}
              style={[
                styles.btnColor,
                { backgroundColor: color.backgroundColor }
              ]}
              onPress={() => handleBackgroundcolorChange(color)}
            ></TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )

  const renderTemplateView = () => (
    <View style={styles.title}>
      <Text style={styles.textTitle}>{i18n.t(`setting.template`)}</Text>
    </View>
  )

  const renderCustomView = () => (
    <>
      <Text style={styles.titleText}>{i18n.t(`setting.custom`)}</Text>
      <View style={styles.fieldView}>
        <Image source={Images.icFont} style={styles.imageLabel} />
        <Text style={styles.labelText}>{i18n.t(`setting.font`)}</Text>
        <TouchableOpacity
          onPress={handleShowFontsPicker}
        >
          <Text style={[styles.fontText, { fontFamily: textStyle.fontFamily }]}>
            {textStyle.fontFamily ? textStyle.fontFamily : 'Lora'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldView}>
        <Image source={Images.icFontSize} style={styles.imageLabel} />
        <Text style={styles.labelText}>{i18n.t(`setting.fontSize`)}</Text>
        <View style={styles.fontSizeView}>
          <TouchableOpacity style={styles.fontSizeBtn}
            onPress={() => handleFontSizeChange(false)}
          >
            <Image source={Images.icSubtract} style={styles.icChangeSize} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fontSizeBtn}
            onPress={() => handleFontSizeChange(true)}
          >
            <Image source={Images.icAdd} style={styles.icChangeSize} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.fieldView]}>
        <Image source={Images.icTextColor} style={styles.imageLabel} />
        <Text style={styles.labelText}>{i18n.t(`setting.textColor`)}</Text>
        {renderTextColors()}
      </View>
      <View style={styles.fieldView}>
        <Image source={Images.icFillColor} style={styles.imageLabel} />
        <Text style={styles.labelText}>{i18n.t(`setting.backgroundColor`)}</Text>
        {renderBackgroundcolors()}
      </View>
    </>
  )


  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={SlideOutDown.duration(300)}
      style={[styles.container]}
    >
      {renderCustomView()}
      {isShowFontsPicker && <FontsPickerBox handleClose={handleCloseFontsPicker} />}

    </Animated.View>
  );
};



export default React.memo(InterfaceSetting);
