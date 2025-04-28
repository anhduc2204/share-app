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
      paddingTop: Metrics.regular,
      flex: 1,
    },
    ///
    emptyView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      width: '80%',
      textAlign: 'center'
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
    requesterNameView: {
      flexDirection: 'row'
    },
    requesterNameText: {
      fontWeight: '500'
    },
    ///
    btnResponse: {
      flexDirection: 'row',
      marginTop: 8,
      justifyContent: 'flex-end'
    },
    btnResponseText: {
      color: '#fff'
    },
    btnAccepted: {
      backgroundColor: Colors.blue_bland,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6
    },
    btnRejected: {
      marginRight: 12,
      backgroundColor: Colors.red,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    popupConfirm: {
      position: 'absolute',

    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(193, 193, 193, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    popuppView: {
      width: width - 24,
      backgroundColor: Colors.white,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 12,
    },
    popupContent: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    requesterName: {
      fontWeight: '500'
    },
    popupConfirmBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 12
    },
    popupBtnCancel: {
      marginRight: 6,
      backgroundColor: Colors.red,
      borderRadius: 6,
      width: '25%',
      alignItems: 'center',
      paddingVertical: 4,
    },
    popupBtnAccept: {
      marginLeft: 6,
      backgroundColor: Colors.blue_bland,
      borderRadius: 6,
      width: '25%',
      alignItems: 'center',
      paddingVertical: 4,
    },
    popupBtnAcceptText: {
      color: '#ffffff'
    }
  })
};

export default createStyles;
