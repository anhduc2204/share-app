import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    ///
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
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
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // bottom: 0,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    titleText: {
      ...Fonts.regular,
      ...Helpers.textBold
    },
    //
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
      marginBottom: 5,
    },
    sendButton: {
      backgroundColor: '#007bff',
      borderRadius: 20,
      padding: 8,
      height: 36,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    inputContainer: {
      borderTopWidth: 1,
      borderTopColor: '#E8E8E8',
      backgroundColor: 'white',
    },
  })
};

export default createStyles;
