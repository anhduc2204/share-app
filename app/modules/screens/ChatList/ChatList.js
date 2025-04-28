import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../components/context/AuthContext';
import { useTheme } from '../../components/context/ThemeContext';
import createStyles from './styles';
import Footer from '../../components/view/Footer';

const ChatList = ({ }) => {
  const navigation = useNavigation();

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { updateUser, user } = useAuth();

  const { isDarkTheme } = useTheme();

  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('chats')
        .where('participants', 'array-contains', user.uid)
        .orderBy('lastMessageTimestamp', 'desc')
        .onSnapshot(snapshot => {
          if (snapshot && !snapshot.empty) {
            const chatList = [];
            snapshot.forEach(doc => {
              const chatData = doc.data();
              const otherUserId = chatData.participants.find(id => id !== user.uid);

              chatList.push({
                id: doc.id,
                otherUserId,
                lastMessage: chatData.lastMessage,
                lastMessageTimestamp: chatData.lastMessageTimestamp,
                unreadCount: chatData.unreadCount ? (chatData.unreadCount[user.uid] || 0) : 0
              });
            });
            setChats(chatList);
          } else {
            setChats([]);
          }
          setLoading(false);
        })

      return () => unsubscribe();
    }
  }, [user]);

  // Lấy thông tin người dùng để hiển thị tên
  useEffect(() => {
    const fetchUserDetails = async () => {
      for (const chat of chats) {
        if (!chat.otherUserName) {
          const userDoc = await firestore().collection('users').doc(chat.otherUserId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {chats.length === 0 ? (
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
      <Footer screen={'ChatList'} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ChatList;