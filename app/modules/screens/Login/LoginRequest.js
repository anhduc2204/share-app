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
import i18n from "../../../i18n/i18n";
import { Images, Metrics } from "../../../theme";
import Login from "./Login";

const LoginRequest = (props) => {

  const navigation = useNavigation();

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();

  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  return (
    <>
      <View style={styles.loginRequestView}>
        <Image source={Images.icSecure} style={styles.icSecure} />
        <Text style={styles.requestText}>{i18n.t(`login.loginRequest`)}</Text>
        <TouchableOpacity style={styles.btnRequestLogin} onPress={props.showLogin}>
          <Text style={styles.btnRequestLoginText}>{i18n.t(`login.login`)}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Text style={styles.descText}>{i18n.t(`login.desc`)}</Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

export default LoginRequest;