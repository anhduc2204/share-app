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
    cardView: {
      padding: 8,
      backgroundColor: '#FFF',
      marginBottom: 12
    },
    popuppView: {
      width: width - 24,
      backgroundColor: Colors.white,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 12,
    },
    postInfoView: {
      flexDirection: 'row',
      // borderWidth: 0.3,
      // borderColor: Colors.textGrey,
      borderRadius: 4,
      overflow: 'hidden',
      // alignItems: 'center',
      backgroundColor: 'rgb(247, 247, 247)'
    },
    postInfoRight: {
      // width: '100%',
      flex: 1,
      paddingRight: 8
    },
    postTitle: {
      width: '100%',
    },
    postDesc: {
      width: '100%',
      fontSize: 12,
      color: 'rgb(136, 136, 136)'
    },
    postUsername: {
      fontStyle: 'italic',
      fontSize: 12,
      color: '#38445b'
    },
    requestImage: {
      width: '35%',
      aspectRatio: 16 / 9,
      marginRight: 8
    },
    requestContent: {
      marginTop: 8,
    },
    contentText: {
      color: 'rgb(136, 136, 136)',
      fontSize: 12
    },
    statuslabel: {
      fontSize: 12
    },
    statusView: {
      flexDirection: 'row',
      marginTop: 4
    },
    ///
    cardFooter: {
      marginTop: 12,
    },
    icChat: {
      width: 20,
      height: 20,
      tintColor: '#ffffff'
    },
    contactNowBtn: {
      backgroundColor: '#007bff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      // marginVertical: 10,
      alignItems: 'center'
    },
    contactNowText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
  })
};

export default createStyles;
