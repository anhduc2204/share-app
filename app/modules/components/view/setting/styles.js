import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height * 0.45,
      backgroundColor: Colors.thirdBackground,
      paddingHorizontal: Metrics.small,
      paddingTop: Metrics.normal,
      borderTopLeftRadius: Metrics.normal,
      borderTopRightRadius: Metrics.normal,
    },
    titleText: {
      color: Colors.textGrey,
      ...Helpers.textBold,
      ...Fonts.large,
    },
    fieldView: {
      flexDirection: 'row',
      height: Metrics.medium * 2,
      alignItems: 'center',
    },
    imageLabel: {
      width: Metrics.regular,
      height: Metrics.regular,
      tintColor: Colors.text
    },
    labelText: {
      color: Colors.text,
      marginLeft: Metrics.small,
      width: width * 0.25,
    },
    fontText: {
      color: Colors.secondaryBackground,
    },
    fontSizeView: {
      flexDirection: 'row',
    },
    fontSizeBtn: {
      borderWidth: 1,
      borderRadius: Metrics.tiny,
      borderColor: Colors.blue_bland,
      width: '35%',
      marginRight: Metrics.small,
      paddingVertical: Metrics.tiny,
      alignItems: 'center'
    },
    icChangeSize: {
      width: Metrics.regular,
      height: Metrics.regular,
      tintColor: Colors.text
    },
    // ----------------------------- 
    pickerContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height * 0.45,
      backgroundColor: Colors.thirdBackground,
      borderTopLeftRadius: Metrics.normal,
      borderTopRightRadius: Metrics.normal,
    },
    headerPicker: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    btnBack: {
      paddingHorizontal: Metrics.small,
      paddingVertical: Metrics.normal,
    },
    icBack: {
      tintColor: Colors.text,
      width: Metrics.icon,
      height: Metrics.icon
    },
    headerText: {
      ...Fonts.regular,
      color: Colors.text,
      ...Helpers.textBoldfive,
    },
    ///// --------- 
    listFont: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingHorizontal: Metrics.small,
      paddingBottom: Metrics.regular
    },
    itemFontBtn: {
      borderWidth: 1,
      width: '48%',
      height: Metrics.medium * 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Metrics.small,
      borderRadius: Metrics.small,
      borderColor: Colors.thirdText
    },
    itemFontText: {
      color: Colors.text,
      ...Fonts.regular,
      textAlign: 'center'
    },
    spacer: {
      width: '2%',
    },
    //// ---
    scrollViewContainer: {
      width: '60%'
    },
    listColor: {
      flex: 1,
      flexDirection: 'row',
      // width: '50%',
      alignItems: 'center',
    },
    btnColor: {
      width: Metrics.large,
      height: Metrics.large,
      borderRadius: Metrics.regular,
      borderWidth: 2,
      borderColor: Colors.text,
      backgroundColor: Colors.backgroundReader,
      marginRight: Metrics.normal
    },


  })
};

export default createStyles;
