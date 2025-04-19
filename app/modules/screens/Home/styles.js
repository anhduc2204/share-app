import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors as Themes, Fonts, Helpers, Images, Metrics } from "@app/theme";

const createStyles = (isDarkTheme) => {
    const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.background
        },
        ////header
        header: {
            width: width,
            backgroundColor: Colors.background,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Metrics.icon / 2,
            paddingBottom: Metrics.normal
        },
        headerLogo: {
            width: Metrics.large + Metrics.tiny,
            height: Metrics.large + Metrics.tiny,
            marginRight: Metrics.icon / 2
        },
        btnSearch: {
            flexDirection: 'row',
            backgroundColor: Colors.thirdBackground,
            paddingVertical: Metrics.small,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Metrics.icon
        },
        icSearch: {
            width: Metrics.icon,
            height: Metrics.icon,
            tintColor: Colors.secondaryText,
            marginRight: Metrics.tiny
        },
        searchTextPlaceholder: {
            color: Colors.secondaryText,
            ...Fonts.regular
        },
        ///---------------
        /// body
        titleRedirectView: {
            flexDirection: 'row',
        },
        btnTitleRedirect: {
            paddingHorizontal: Metrics.normal,
            paddingBottom: Metrics.small
        },
        titleRedirectText: {
            ...Fonts.large,
            color: Colors.textGrey
        },
        content: {
            flex: 1,
            paddingHorizontal: Metrics.icon / 2,
            // backgroundColor: Colors.thirdBackground
        },
        errorView: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Metrics.normal,
            flexDirection: 'row'
        },
        icWarning: {
            width: Metrics.regular,
            height: Metrics.regular,
            tintColor: Colors.red
        },
        errorText: {
            color: Colors.red
        },
        scrollView: {
            paddingBottom: Metrics.medium
        },
        listContent: {
            marginTop: Metrics.regular,
            // borderWidth: 1
        },
        listView: {
            flexDirection: 'row'
        },
        titleList: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: Metrics.tiny,
            alignItems: 'flex-end'
        },
        titleListText: {
            ...Fonts.large,
            color: Colors.text
        },
        btnMore: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        moreText: {
            color: Colors.blue_bland,
            paddingLeft: Metrics.medium,
            ...Fonts.small,
            marginRight: Metrics.tiny
        },
        icArrowRight: {
            width: Metrics.icon / 2,
            height: Metrics.icon / 2,
            tintColor: Colors.blue_bland
        },
        btnItemList: {
            alignItems: 'flex-start'
        },
        imageView: {
            backgroundColor: Colors.backgroundGrey,
            // alignItems: 'center',
            overflow: 'hidden',
            borderRadius: Metrics.tiny,
        },
        imageNormal: {
            height: height / 5,
            aspectRatio: 2 / 3
        },
        imageDefault: {
            height: height / 5 - Metrics.medium * 3,
            marginVertical: Metrics.medium * 3 / 2,
            marginHorizontal: Metrics.medium,
            aspectRatio: 2 / 3,
        },
        infoItem: {
            width: height * 2 / 15,
            paddingTop: Metrics.tiny,
            // paddingHorizontal: Metrics.tiny,
        },
        textTitle: {
            width: '100%',
            color: Colors.textWhite,
            ...Fonts.tiny
        },
        chapterNum: {
            ...Fonts.miniTiny,
            color: Colors.secondaryBackground,
        },
        updateTime: {
            ...Fonts.miniTiny,
            color: Colors.textGrey,
            fontStyle: 'italic'
        },
        spacer: {
            width: Metrics.small,
        },
        ///
        rankCol: {
        },
        rankItem: {
            flexDirection: 'row',
            marginBottom: Metrics.small,
            alignItems: 'flex-start'
        },
        itemName: {
            width: width / 2,
            color: Colors.textWhite,
            ...Fonts.medium,
        },
        topItemText: {
            color: Colors.gold,
            ...Fonts.tiny
        },
        imageRankView: {
            backgroundColor: Colors.backgroundGrey,
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: Metrics.tiny,
            marginRight: Metrics.small,
        },
        imageRankItem: {
            width: width / 8,
            aspectRatio: 2 / 3,
        },
        imageRankDefault: {
            width: width / 12,
            marginHorizontal: width / 48,
            marginVertical: width / 32,
            aspectRatio: 2 / 3,
        },
        quoteView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icView: {
            width: Metrics.normal,
            height: Metrics.normal,
            tintColor: Colors.blue_bland
        },
        icStarNormal: {
            width: Metrics.normal,
            height: Metrics.normal,
            tintColor: Colors.secondaryBackground
        },
        quoteText: {
            ...Fonts.small,
            marginLeft: Metrics.tiny,
            marginRight: Metrics.small
        },
        ratingText: {
            color: Colors.secondaryBackground
        },
        viewText: {
            color: Colors.blue_bland
        },
        ////
        listReview: {
            backgroundColor: Colors.backgroundGrey,
            padding: Metrics.small,
            borderRadius: Metrics.small
        },
        reviewItem: {
            flexDirection: 'row',
            marginBottom: Metrics.normal
        },
        icUser: {
            width: Metrics.large,
            height: Metrics.large,
            tintColor: Colors.textGrey
        },
        reviewCard: {
            backgroundColor: Colors.thirdBackground,
            flex: 1,
            marginLeft: Metrics.small,
            borderRadius: Metrics.small,
            padding: Metrics.small,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        starView: {
            flexDirection: 'row'
        },
        icStar: {
            width: Metrics.regular,
            height: Metrics.regular,
            tintColor: Colors.gold
        },
        reviewUser: {
            marginTop: Metrics.tiny,
            color: Colors.textWhite,
            ...Helpers.textBoldfive,
            ...Fonts.small

        },
        cardHeaderRight: {
            alignItems: 'flex-end'
        },
        reviewTime: {
            color: Colors.textGrey,
            ...Fonts.tiny
        },
        btnLike: {
            backgroundColor: Colors.backgroundGrey,
            alignItems: 'center',
            paddingHorizontal: Metrics.regular,
            paddingVertical: Metrics.tiny / 2,
            marginTop: Metrics.tiny,
            borderRadius: Metrics.tiny
        },
        icLike: {
            width: Metrics.regular,
            height: Metrics.regular,
            tintColor: Colors.white
        },
        reviewContent: {
            marginTop: Metrics.regular
        },
        reviewContentText: {
            color: Colors.white,
            fontWeight: '300',
            ...Fonts.medium
        }

    })
};

export default createStyles;
