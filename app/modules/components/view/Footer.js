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
import { Images } from "../../../theme";
import i18n from "@app/i18n/i18n";


const Footer = (props) => {

  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();
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
                <Image source={Images.icHome} style={styles.icLarge} />
                <Text style={styles.textFooter}>{i18n.t(`overview.home`)}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Overview')}>
                <Image source={Images.icHistory} style={styles.icLarge} />
                <Text style={styles.textFooter}>Lịch sử</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Overview')}>
                <Image source={Images.icHistory} style={styles.icLarge} />
                <Text style={styles.textFooter}>Xem sau</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Overview')}>
                <Image source={Images.icHistory} style={styles.icLarge} />
                <Text style={styles.textFooter}>Tin nhắn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter} onPress={() => handleNavigation('Profile')}>
                <Image source={Images.icUser} style={styles.icMedium} />
                <Text style={styles.textFooter}>{i18n.t(`overview.me`)}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};



export default React.memo(Footer);
