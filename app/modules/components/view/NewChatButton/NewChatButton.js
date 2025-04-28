import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const NewChatButton = ({ otherUserId, otherUserName }) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  // Ngăn người dùng chat với chính mình
  if (otherUserId === user.uid) {
    return null;
  }

  const startChat = async () => {
    try {
      // Sắp xếp ID người dùng để tạo ID nhất quán
      const sortedIds = [user.uid, otherUserId].sort();
      const chatId = sortedIds.join('_');

      // Kiểm tra xem chat đã tồn tại chưa
      const chatDoc = await firestore().collection('chats').doc(chatId).get();

      if (!chatDoc.exists) {
        // Tạo chat mới nếu chưa tồn tại
        await firestore().collection('chats').doc(chatId).set({
          participants: sortedIds,
          lastMessage: '',
          lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
          unreadCount: {
            [user.uid]: 0,
            [otherUserId]: 0
          }
        });
      }

      // Điều hướng đến màn hình chat
      navigation.navigate('ChatRoom', { chatId, otherUserId, otherUserName });
    } catch (error) {
      console.error('Error starting chat:', error);
      Alert.alert('Lỗi', 'Không thể bắt đầu cuộc trò chuyện. Vui lòng thử lại sau.');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={startChat}>
      <Text style={styles.buttonText}>Liên hệ ngay</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#007bff',
    borderWidth: 1,
    borderColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default NewChatButton;