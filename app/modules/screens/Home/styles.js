import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
    const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.backgroundGrey
        },
        ////header
        header: {
            width: width,
            backgroundColor: Colors.background,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            // alignItems: 'center',
            paddingLeft: Metrics.normal,
            // paddingBottom: Metrics.normal
        },
        inputSearchView: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        inputText: {
            color: Colors.text,
            paddingVertical: Metrics.small,
            marginLeft: Metrics.small
        },
        icSearch: {
            width: Metrics.icon,
            height: Metrics.icon,
            tintColor: Colors.textGrey
        },
        icMedium: {
            width: Metrics.medium,
            height: Metrics.medium,
            tintColor: Colors.blue_bland
        },
        btnProfile: {
            paddingRight: Metrics.normal,
            paddingLeft: Metrics.regular,
            paddingVertical: 8,
            justifyContent: 'center'
        },
        icBell: {
            width: 32,
            height: 32,
            tintColor: Colors.blue_bland
        },
        btnAlert: {
            paddingVertical: 8,
            paddingRight: 4,
            paddingLeft: 8,
            justifyContent: 'center',
        },
        ///
        content: {
            flex: 1,
            // paddingTop: 16,
        },
        itemView: {
            marginHorizontal: 12,
            marginTop: 16,
            backgroundColor: '#ffffff',
            elevation: 2,
            borderRadius: 8,
            alignItems: 'flex-start',
            overflow: 'hidden'
        },
        itemHeader: {
            flexDirection: 'row',
            padding: 8,
            alignItems: 'center',
        },
        userName: {
            fontWeight: 'bold',
            color: Colors.text,
            fontSize: 18,
            marginLeft: 8
        },
        imageUser: {
            width: 28,
            height: 28,
            tintColor: Colors.textGrey,
        },
        imageView: {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 8,
            // borderWidth: 1
        },
        itemImage: {
            width: (width - 40) / 2,
            aspectRatio: 16 / 9
        },
        itemInfoView: {
            paddingHorizontal: 8,
            marginTop: 12
        },
        itemTitle: {
            ...Helpers.textBoldfive,
            fontSize: 16
        },
        itemDesc: {
            width: '100%',
        },
        itemContact: {
            marginTop: 8,
            fontSize: 12,
        },
        itemAddress: {
            fontSize: 12,
        },
        itemFooter: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            paddingHorizontal: 8
        },
        icStar: {
            width: 28,
            height: 28,
            tintColor: Colors.blue_bland
        },
        btnSendRequest: {
            borderRadius: 8,
            backgroundColor: Colors.blue_bland,
            paddingVertical: 8,
            alignItems: 'center',
            flex: 1
        },
        btnSendRequestText: {
            color: Colors.white
        },
        btnSave: {
            paddingLeft: 16,
            marginLeft: 16
        },
        ////---------
        inputBox: {
            marginTop: Metrics.tiny,
            marginBottom: Metrics.small,
            backgroundColor: Colors.white,
            borderRadius: Metrics.small,
            // paddingHorizontal: Metrics.small
        },
        textInput: {
            paddingVertical: Metrics.small,
            color: Colors.text,
            ...Fonts.medium,
            borderWidth: 0.4,
            borderColor: Colors.textGrey
        },
        ///--------

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
        postInfoView: {
            flexDirection: 'row',
            // borderWidth: 0.3,
            // borderColor: Colors.textGrey,
            borderRadius: 4,
            overflow: 'hidden',
            alignItems: 'center',
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
        postUsername: {
            fontStyle: 'italic',
            fontSize: 12,
            color: '#38445b'
        },
        requestImage: {
            width: '20%',
            aspectRatio: 16 / 9,
            marginRight: 8
        },
        requestContent: {
            marginTop: 12
        },
        btnPopup: {
            backgroundColor: Colors.blue_bland,
            borderRadius: 4,
            paddingVertical: 8,
            alignItems: 'center',
        },
        btnPopupText: {
            color: Colors.white
        },
        ///
        messageAlertView: {
            position: 'absolute',
            bottom: 64,
            left: width / 6,
            right: width / 6,
            backgroundColor: '#38445b',
            borderRadius: 8
        },
        messageAlertText: {
            color: '#ffffff',
            textAlign: 'center',
            paddingVertical: 8,
        },


    })
};

export default createStyles;
