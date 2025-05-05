import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllUsers } from '../../../service/userService';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userList = await getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users: ', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  // Tải lại danh sách khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const handleDeleteUser = (uid) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa người dùng này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              await deleteUser(uid);
              setUsers(users.filter(user => user.uid !== uid));
              Alert.alert('Thành công', 'Đã xóa người dùng');
            } catch (error) {
              console.error('Error deleting user: ', error);
              Alert.alert('Lỗi', 'Không thể xóa người dùng');
            }
          },
          style: 'destructive'
        },
      ]
    );
  };

  const renderUserItem = ({ item }) => {
    // Tính lương thực nhận
    const heSoLuong = parseFloat(item.heSoLuong);
    const luongCB = parseInt(item.luongCB);
    const luongThucNhan = heSoLuong * luongCB;

    return (
      <View style={styles.userCard}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.hoTen}</Text>
          <Text style={styles.userDetail}>Ngày sinh: {item.ngaySinh}</Text>
          <Text style={styles.userDetail}>Hệ số lương: {item.heSoLuong}</Text>
          <Text style={styles.userDetail}>Lương cơ bản: {parseInt(item.luongCB).toLocaleString('vi-VN')} VNĐ</Text>
          {/* <Text style={styles.salary}>Lương thực nhận: {luongThucNhan.toLocaleString('vi-VN')} VNĐ</Text> */}
        </View>
        {/* <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteUser(item.uid)}
          >
            <Text style={styles.actionButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Chưa có người dùng nào</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh Sách Người Dùng</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddUser')}
        >
          <Text style={styles.addButtonText}>+ Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={item => item.uid}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
          refreshing={loading}
          onRefresh={loadUsers}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    flexGrow: 1,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  userInfo: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  salary: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007BFF',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#FF5722',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserListScreen;