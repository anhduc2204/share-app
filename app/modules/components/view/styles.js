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
      width: Metrics.medium,
      height: Metrics.medium,
      marginVertical: Metrics.tiny,
      tintColor: Colors.textGrey
    },
    btnFooter: {
      // flex: 1,
      paddingHorizontal: Metrics.regular,
      paddingVertical: Metrics.tiny,
      alignItems: 'center',
    },
    textFooter: {
      color: Colors.textGrey,
      ...Fonts.small,
    },

  })
};

export default createStyles;
