import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  return StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: Colors.text,
      width: width,
      // paddingHorizontal: Metrics.normal
    },
    headerTab: {
      flexDirection: 'row',
      marginTop: Metrics.normal,
      paddingHorizontal: Metrics.normal,
      justifyContent: 'space-between'
    },
    // btnSearch: {
    //   backgroundColor: Colors.thirdBackground,
    //   flex: 1,
    //   paddingVertical: Metrics.normal,
    //   borderRadius: Metrics.icon,
    //   paddingHorizontal: Metrics.normal
    // },
    // searchPlaceholder: {
    //   color: Colors.secondaryText,
    //   ...Fonts.regular
    // },
    btnSort: {
      flexDirection: 'row',
      // paddingLeft: Metrics.regular,
      alignItems: 'center',
    },
    sortText: {
      color: Colors.text,
      ...Fonts.medium,
      marginLeft: Metrics.tiny
    },
    icSort: {
      width: Metrics.icon,
      height: Metrics.icon,
      tintColor: Colors.text
    },
    btnShowDelete: {
      marginRight: -Metrics.tiny / 2,
      paddingLeft: Metrics.normal
    },
    ///
    contentTab: {
      flex: 1,
    },
    contentFlatlist: {
      paddingBottom: Metrics.medium
    },
    itemView: {
      marginTop: Metrics.normal,
      marginHorizontal: Metrics.normal,
    },
    btnItemList: {
      flexDirection: 'row',
      backgroundColor: Colors.backgroundGrey,
      padding: Metrics.small,
      borderRadius: Metrics.small,
    },
    imageView: {
      backgroundColor: Colors.thirdBackground,
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: Metrics.tiny,
      marginRight: Metrics.small,
    },
    imageDefault: {
      height: height / 5 - Metrics.medium * 3,
      marginVertical: Metrics.medium * 3 / 2,
      marginHorizontal: Metrics.medium,
      aspectRatio: 2 / 3,
    },
    imageNormal: {
      height: height / 5,
      aspectRatio: 2 / 3
    },
    itemInfo: {
      flex: 1,
      justifyContent: 'space-between'
    },
    bookName: {
      color: Colors.text,
      width: '100%',
      ...Fonts.large,
      ...Helpers.textBold,
      opacity: 0.9
    },
    updateTime: {
      ...Fonts.small,
      color: Colors.textGrey,
      fontStyle: 'italic',
      opacity: 0.9
    },
    authorView: {
      flexDirection: 'row',
      paddingVertical: Metrics.tiny
    },
    authorBtn: {
      marginRight: Metrics.tiny
    },
    author: {
      ...Fonts.small,
      color: Colors.secondaryBackground
    },
    ///
    btnContinute: {
      backgroundColor: Colors.blue_bland,
      alignItems: 'center',
      paddingVertical: Metrics.tiny,
      borderRadius: Metrics.small,
      paddingHorizontal: Metrics.small,
      flex: 1,
      marginLeft: Metrics.regular
    },
    continuteText: {
      color: Colors.textWhite
    },
    footerItem: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    icOpenBook: {
      width: Metrics.regular,
      height: Metrics.regular,
      tintColor: Colors.blue_bland
    },
    totalChapterView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    totalChapterText: {
      color: Colors.blue_bland,
      ...Fonts.small,
      opacity: 0.8,
      marginLeft: Metrics.small
      // marginRight: Metrics.medium
    },
    btnClose: {
      position: 'absolute',
      backgroundColor: Colors.red,
      padding: Metrics.tiny,
      borderTopRightRadius: Metrics.small,
      borderBottomLeftRadius: Metrics.small,
      right: 0,
      top: 0
    },
    icClose: {
      width: Metrics.normal,
      height: Metrics.normal,
      tintColor: Colors.textWhite
    }

  })
};

export default createStyles;
