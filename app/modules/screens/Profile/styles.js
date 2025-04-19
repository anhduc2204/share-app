import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  return StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: Colors.background
    },
    content: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      width: '100%',
      marginTop: Metrics.large
    },
    image: {
      width: Metrics.large * 3,
      height: Metrics.large * 3,
      tintColor: Colors.blue_bland,
      opacity: 0.9
    },
    name: {
      color: Colors.text,
      ...Helpers.textBoldfive,
      ...Fonts.h4,
      marginTop: Metrics.normal
    },
    settingOption: {
      backgroundColor: Colors.backgroundGrey,
      marginTop: Metrics.medium
    },
    line: {
      height: 2,
      width: '100%',
      backgroundColor: Colors.background
    },
    btnOption: {
      flexDirection: 'row',
      paddingHorizontal: Metrics.normal,
      height: Metrics.medium * 2,
      alignItems: 'center',
    },
    optionText: {
      color: Colors.text,
      ...Fonts.regular,
      flex: 1,
      marginLeft: Metrics.normal
    },
    iconOptionItem: {
      width: Metrics.medium,
      height: Metrics.medium,
      tintColor: Colors.text,
    },
    icArrowRight: {
      width: Metrics.normal,
      height: Metrics.normal,
      tintColor: Colors.textGrey,
      opacity: 0.8
    },
    FooterView: {
      marginTop: Metrics.regular,
      alignItems: 'center'
    },
    logoutBtn: {
      flexDirection: 'row',
    },
    icLogout: {
      width: Metrics.medium,
      height: Metrics.medium,
      tintColor: Colors.red,
    },
    logoutText: {
      color: Colors.red,
      ...Fonts.regular
    },
    loadingView: {
      marginTop: Metrics.normal
    }
  })
};

export default createStyles;
