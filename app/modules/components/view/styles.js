import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  return StyleSheet.create({
    footer: {
      width: width,
      backgroundColor: Colors.backgroundGrey,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    icLarge: {
      width: Metrics.large,
      height: Metrics.large,
      tintColor: Colors.textGrey
    },
    icMedium: {
      width: 28,
      height: 28,
      marginBottom: Metrics.tiny / 2,
      tintColor: Colors.textGrey
    },
    icMessage: {
      width: Metrics.large,
      height: Metrics.large,
      tintColor: Colors.textGrey,
      // marginTop: -4,
      marginBottom: 2
    },
    btnFooter: {
      // flex: 1,
      paddingHorizontal: Metrics.regular,
      paddingVertical: Metrics.tiny,
      alignItems: 'center',
      // borderWidth: 1,
    },
    textFooter: {
      color: Colors.textGrey,
      ...Fonts.small,
    },

  })
};

export default createStyles;
