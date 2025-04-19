import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import BackgroundGeolocation from "./app/modules/location/backgroundGeolocation";
import messaging from '@react-native-firebase/messaging';
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);;

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  Platform.OS === 'android' &&
    PushNotification.localNotification({
      channelId: 'ShareApp',
      message: remoteMessage.body,
      title: remoteMessage.title,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      data: remoteMessage.data,
    });
});

AppRegistry.registerComponent(appName, () => App);
