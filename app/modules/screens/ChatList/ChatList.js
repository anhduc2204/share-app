import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../components/context/AuthContext';
import { useTheme } from '../../components/context/ThemeContext';
import createStyles from './styles';
import Footer from '../../components/view/Footer';
import { getUser } from '../../../service/userService';
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'react-native';
import { Images } from '../../../theme';
import LoginRequest from '../Login/LoginRequest';
import Login from '../Login/Login';

const ChatList = ({ }) => {
  const navigation = useNavigation();

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { updateUser, user, isLoadedUser } = useAuth();

  const { isDarkTheme } = useTheme();

  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoadedUser && user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user, isLoadedUser])

  useFocusEffect(
    useCallback(() => {
      let unsubscribe = null;

      if (isLoadedUser && user) {
        unsubscribe = firestore()
          .collection('chats')
          .where('participants', 'array-contains', user.uid)
          .orderBy('lastMessageTimestamp', 'desc')
          .onSnapshot(snapshot => {
            if (snapshot) {
              if (snapshot.size > 0) {
                // Có dữ liệu thực sự
                const chatList = [];
                snapshot.forEach(doc => {
                  const chatData = doc.data();
                  const otherUserId = chatData.participants.find(id => id !== user.uid);

                  chatList.push({
                    id: doc.id,
                    otherUserId: otherUserId,
                    lastMessage: chatData.lastMessage,
                    lastMessageTimestamp: chatData.lastMessageTimestamp,
                    unreadCount: chatData.unreadCount ? (chatData.unreadCount[user.uid] || 0) : 0,
                  });
                });
                setChats(chatList);
              } else {
                // ❗ Xác định rõ ràng rằng server không còn cuộc chat nào
                console.log('Không còn cuộc chat nào.');
                setChats([]);
              }
            }
            setLoading(false);
          });
      }

      return () => {
        if (unsubscribe) {
          unsubscribe(); // Dừng lắng nghe snapshot
        }
      };
    }, [user, isLoadedUser])
  );


  // Lấy thông tin người dùng để hiển thị tên
  useEffect(() => {
    const fetchUserDetails = async () => {
      for (const chat of chats) {
        if (!chat.otherUserName) {
          // const userDoc = await firestore().collection('users').doc(chat.otherUserId).get();
          const userData = await getUser(chat.otherUserId);
          if (userData) {
            setChats(prevChats =>
              prevChats.map(c =>
                c.id === chat.id
                  ? { ...c, otherUserName: userData.displayName, otherUserPhoto: userData.photoURL }
                  : c
              )
            );
          }
        }
      }
    };

    if (chats.length > 0) {
      fetchUserDetails();
    }
  }, [chats]);

  const navigateToChat = (chatId, otherUserId, otherUserName) => {
    navigation.navigate('ChatRoom', { chatId, otherUserId, otherUserName });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();

    if (moment(date).isSame(now, 'day')) {
      return moment(date).format('HH:mm');
    } else if (moment(date).isSame(now, 'week')) {
      return moment(date).format('ddd');
    } else {
      return moment(date).format('DD/MM/YYYY');
    }
  };

  const showLogin = () => {
    setIsShowLogin(true);
  }
  const closeLogin = () => {
    setIsShowLogin(false);
  }

  const [isShowLogin, setIsShowLogin] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigateToChat(item.id, item.otherUserId, item.otherUserName)}
    >
      <View style={styles.chatInfo}>
        <Text style={styles.userName}>{item.otherUserName || 'Đang tải...'}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage || 'Không có tin nhắn'}
        </Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.timeText}>{formatTime(item.lastMessageTimestamp)}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );


  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  // console.log('chats: ', chats);
  const renderHeader = (insets) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.btnHeader} onPress={() => navigation.goBack()}>
        <Image source={Images.icArrowLeft} style={styles.icBack} />
      </TouchableOpacity>
      <View style={[styles.titleView, { top: insets.top }]}>
        <Text style={styles.titleText}>Tin nhắn</Text>
      </View>
    </View>
  )
  const renderBody = (insets) => (
    <View style={{ flex: 1 }}>
      {renderHeader(insets)}
      {chats.length <= 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bạn chưa có cuộc trò chuyện nào</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  )

  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={styles.container}>
            {!user ? <LoginRequest showLogin={showLogin} /> : renderBody(insets)}
            <Footer screen={'ChatList'} />
            {isShowLogin &&
              <Login closeLogin={closeLogin} />
            }
            {/* {renderHeader(insets)}
      
              <Footer screen={'ChatList'} /> */}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};

export default ChatList;