import React, { Fragment, useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
// import { Text, View, SafeAreaView, Image } from "react-native";
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Images, Colors as Themes } from "../../../theme";
import i18n from "@app/i18n/i18n";


const Footer = ({ screen }) => {

  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  }

  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            <View style={styles.footer}>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Overview')}>
                <Image source={Images.icHome} style={[styles.icLarge, screen === 'Overview' ? { tintColor: Colors.blue_bland } : {}]} />
                <Text style={[styles.textFooter, screen === 'Overview' ? { color: Colors.blue_bland } : {}]}>Trang chủ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Activate')}>
                <Image source={Images.icActivate} style={[styles.icMedium, screen === 'Activate' ? { tintColor: Colors.blue_bland } : {}]} />
                <Text style={[styles.textFooter, screen === 'Activate' ? { color: Colors.blue_bland } : {}]}>Hoạt động</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Overview')}>
                <Image source={Images.icHistory} style={styles.icLarge} />
                <Text style={styles.textFooter}>Xem sau</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Post')}>
                <Image source={Images.icHistory} style={[styles.icLarge, screen === 'Post' ? { tintColor: Colors.blue_bland } : {}]} />
                <Text style={[styles.textFooter, screen === 'Post' ? { color: Colors.blue_bland } : {}]}>Bài đăng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('ChatList')}>
                <Image source={Images.icMessage} style={[styles.icMessage, screen === 'ChatList' ? { tintColor: Colors.blue_bland } : {}]} />
                <Text style={[styles.textFooter, screen === 'ChatList' ? { color: Colors.blue_bland } : {}]}>Tin nhắn</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Profile')}>
                <Image source={Images.icUser} style={styles.icMedium} />
                <Text style={styles.textFooter}>{i18n.t(`overview.me`)}</Text>
              </TouchableOpacity> */}
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};



export default React.memo(Footer);
