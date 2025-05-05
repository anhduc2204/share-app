// import { UserModel } from '../models/schema';
import { UserModel } from '../models/UserSchema';
import { FirebaseDb } from './firebaseConfig';

// import { FirebaseDb } from './firebaseConfig';
// import { UserModel } from './userSchema';

// Thêm người dùng mới
export const createUser = async (user: UserModel) => {
  const ref = FirebaseDb.collection('users').doc(user.uid);
  await ref.set({
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

// Lấy danh sách tất cả người dùng, sắp xếp theo tên
export const getAllUsers = async (): Promise<UserModel[]> => {
  const snapshot = await FirebaseDb.collection('users')
    .orderBy('hoTen', 'asc')
    .get();
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      uid: doc.id,
      hoTen: data.hoTen,
      ngaySinh: data.ngaySinh,
      heSoLuong: data.heSoLuong,
      luongCB: data.luongCB,
    } as UserModel;
  });
};

// Tạo ID mới cho người dùng
export const generateUserId = (): string => {
  return FirebaseDb.collection('users').doc().id;
};

// Xóa người dùng
export const deleteUser = async (uid: string): Promise<void> => {
  await FirebaseDb.collection('users').doc(uid).delete();
};

// Cập nhật người dùng
export const updateUser = async (user: UserModel): Promise<void> => {
  const ref = FirebaseDb.collection('users').doc(user.uid);
  await ref.update({
    ...user,
    updatedAt: new Date().toISOString(),
  });
};