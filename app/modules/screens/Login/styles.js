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
    icLarge: {
      height: Metrics.large,
      width: Metrics.large,
      tintColor: Colors.textWhite
    },
    header: {
      alignItems: 'flex-end',
    },
    icClose: {
      width: Metrics.medium,
      height: Metrics.medium,
      tintColor: Colors.textWhite
    },
    btnClose: {
      paddingLeft: Metrics.medium,
      paddingRight: Metrics.regular,
      paddingVertical: Metrics.medium,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnLogin: {
      width: width * 2 / 3,
      paddingVertical: Metrics.normal,
      paddingHorizontal: Metrics.icon,
      borderRadius: Metrics.large,
      backgroundColor: Colors.blue_bland,
      flexDirection: 'row',
      alignItems: 'center',
    },
    btnLoginText: {
      ...Fonts.regular,
      ...Helpers.textBoldfive,
      color: Colors.textWhite,
      flex: 1,
      textAlign: 'center'
    },
    ///
    loginRequestView: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Metrics.medium * 2
    },
    icSecure: {
      width: Metrics.large * 4,
      height: Metrics.large * 4,
      tintColor: Colors.backgroundGrey
    },
    requestText: {
      color: Colors.textGrey,
      textAlign: 'center',
      marginTop: Metrics.medium
    },
    btnRequestLogin: {
      width: '100%',
      paddingVertical: Metrics.small,
      alignItems: 'center',
      borderRadius: Metrics.small,
      marginVertical: Metrics.regular,
      backgroundColor: Colors.blue_bland
    },
    btnRequestLoginText: {
      color: Colors.textWhite
    },
    descText: {
      color: Colors.textWhite,
      ...Fonts.small
    }
  })
};

export default createStyles;
