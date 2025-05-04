import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../../components/context/ThemeContext';
import createStyles from './styles';
import { Dimensions } from 'react-native';
import { useAuth } from '../../components/context/AuthContext';
import { Images } from '../../../theme';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const ChatRoom = ({ route, navigation }) => {

  const { updateUser, user } = useAuth();
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();

  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);

  const { chatId, otherUserId, otherUserName } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  // const user.uid = auth().currentUser.uid;
  // const currentUserName = auth().currentUser.displayName;
  // const currentUserAvatar = auth().currentUser.photoURL;


  // Tạo hoặc lấy chatId nếu chưa có
  const getChatId = useCallback(async () => {
    if (chatId) return chatId;

    // Sắp xếp ID người dùng để tạo ID nhất quán
    const sortedIds = [user.uid, otherUserId].sort();
    const newChatId = sortedIds.join('_');

    // Kiểm tra xem chat đã tồn tại chưa
    const chatDoc = await firestore().collection('chats').doc(newChatId).get();

    if (!chatDoc.exists) {
      // Tạo chat mới nếu chưa tồn tại
      await firestore().collection('chats').doc(newChatId).set({
        participants: sortedIds,
        lastMessage: '',
        lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
        unreadCount: {
          [user.uid]: 0,
          [otherUserId]: 0
        }
      });
    }

    return newChatId;
  }, [chatId, user.uid, otherUserId]);

  // Đánh dấu tin nhắn đã đọc
  const markMessagesAsRead = useCallback(async (actualChatId) => {
    await firestore().collection('chats').doc(actualChatId).update({
      [`unreadCount.${user.uid}`]: 0
    });

    // Đánh dấu tất cả tin nhắn là đã đọc
    const unreadMessages = await firestore()
      .collection('chats')
      .doc(actualChatId)
      .collection('messages')
      .where('senderId', '==', otherUserId)
      .where('read', '==', false)
      .get();

    const batch = firestore().batch();
    unreadMessages.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });

    if (unreadMessages.size > 0) {
      await batch.commit();
    }
  }, [user.uid, otherUserId]);

  // Tải tin nhắn và lắng nghe tin nhắn mới
  useEffect(() => {
    let messagesListener = null;

    const setupChat = async () => {
      try {
        const actualChatId = await getChatId();

        // Đánh dấu tin nhắn đã đọc khi vào màn hình chat
        await markMessagesAsRead(actualChatId);

        // Lắng nghe tin nhắn mới
        messagesListener = firestore()
          .collection('chats')
          .doc(actualChatId)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot(snapshot => {
            const newMessages = snapshot.docs.map(doc => {
              const firebaseData = doc.data();
              const messageData = {
                _id: doc.id,
                text: firebaseData.text,
                createdAt: firebaseData.createdAt ? firebaseData.createdAt.toDate() : new Date(),
                user: {
                  _id: firebaseData.senderId,
                  name: firebaseData.senderId === user.uid ? user.displayName : otherUserName,
                  avatar: firebaseData.senderId === user.uid ? Images.icAccount : null
                },
                sent: true,
                received: firebaseData.read || firebaseData.senderId === user.uid,
              };

              // Đánh dấu tin nhắn đã đọc nếu không phải của mình
              if (firebaseData.senderId !== user.uid && !firebaseData.read) {
                firestore()
                  .collection('chats')
                  .doc(actualChatId)
                  .collection('messages')
                  .doc(doc.id)
                  .update({ read: true });
              }

              return messageData;
            });

            setMessages(newMessages);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error setting up chat:', error);
        setLoading(false);
      }
    };

    setupChat();

    return () => {
      if (messagesListener) {
        messagesListener();
      }
    };
  }, [user, getChatId, markMessagesAsRead, otherUserName]);

  // Gửi tin nhắn
  const onSend = useCallback(async (newMessages = []) => {
    try {
      const actualChatId = await getChatId();
      const message = newMessages[0];

      // Thêm tin nhắn vào collection messages
      await firestore()
        .collection('chats')
        .doc(actualChatId)
        .collection('messages')
        .add({
          text: message.text,
          senderId: user.uid,
          read: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      // Cập nhật thông tin cuộc trò chuyện
      await firestore()
        .collection('chats')
        .doc(actualChatId)
        .update({
          lastMessage: message.text,
          lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
          [`unreadCount.${otherUserId}`]: firestore.FieldValue.increment(1)
        });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [user.uid, getChatId, otherUserId]);

  // Tùy chỉnh giao diện bong bóng chat
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007bff',
          },
          left: {
            backgroundColor: '#e5e5ea',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'black',
          },
        }}
      />
    );
  };

  // Tùy chỉnh nút gửi
  const renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={styles.sendContainer}
      >
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </View>
      </Send>
    );
  };

  // Thanh nhập tin nhắn
  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
        textInputStyle={{
          color: 'black',
        }}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderHeader = (insets) => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.btnHeader} onPress={() => navigation.goBack()}>
        <Image source={Images.icArrowLeft} style={styles.icBack} />
      </TouchableOpacity>
      <View style={[styles.titleView]}>
        <Text style={styles.titleText}>{otherUserName}</Text>
      </View>
    </View>
  )

  return (
    <>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          < >
            <View style={styles.container}>
              {renderHeader(insets)}
              <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                  _id: user.uid,
                  name: user.displayName,
                  avatar: Images.icAccount,
                }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                alwaysShowSend
                scrollToBottom
                placeholder="Nhập tin nhắn..."
              />
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};

const styles = StyleSheet.create({

});

export default ChatRoom;