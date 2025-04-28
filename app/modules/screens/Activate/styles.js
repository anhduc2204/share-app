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
      backgroundColor: Colors.backgroundGrey
    },
    body: {
      flex: 1,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.background,
    },
    btnHeader: {
      padding: Metrics.normal,
      paddingRight: Metrics.icon
    },
    icBack: {
      width: Metrics.icon,
      height: Metrics.icon,
    },
    titleView: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    titleText: {
      ...Fonts.regular,
      ...Helpers.textBold
    },
    historyBtn: {
      padding: Metrics.normal,
      paddingLeft: Metrics.icon
    },
    historyText: {
      color: Colors.blue_bland
    },
    ///
    content: {
      paddingHorizontal: Metrics.normal,
      paddingTop: Metrics.regular
    },
    ///
    inputBox: {
      marginTop: Metrics.tiny,
      marginBottom: Metrics.small,
      backgroundColor: Colors.white,
      borderRadius: Metrics.small,
      paddingHorizontal: Metrics.small
    },
    textInput: {
      paddingVertical: Metrics.small,
      color: Colors.text,
      ...Fonts.regular
    },
    pickerBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Metrics.tiny,
      backgroundColor: Colors.background,
      borderRadius: Metrics.small,
      paddingVertical: Metrics.normal,
      paddingHorizontal: Metrics.normal
    },
    pickerLabel: {
      marginRight: Metrics.regular
    },
    labelText: {
      ...Helpers.textBoldfive,
      opacity: 0.8,
      color: Colors.text,
      ...Fonts.regular
    },
    ///
    btnPost: {
      backgroundColor: Colors.blue_bland,
      paddingVertical: Metrics.normal,
      borderRadius: Metrics.small,
      marginTop: Metrics.normal,
      alignItems: 'center'
    },
    postText: {
      color: Colors.white,
      ...Fonts.regular,
      ...Helpers.textBoldfive
    }
  })
};

export default createStyles;
