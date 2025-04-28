import { FirebaseDb } from './firebaseConfig'; // Import FirebaseDb đã cấu hình
import { PostModel } from '../models/schema';

// Tạo bài đăng mới
export const createPost = async (postData: PostModel): Promise<string> => {
  console.log('postData: ', postData);
  const ref = FirebaseDb.collection('posts'); 
  const docRef = await ref.add({
    ...postData,
    viewCount: 0,
    saveCount: 0,
    requestCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending', // Trạng thái bài đăng
    recipientId: '', // ID của người nhận đồ (nếu status là "completed")
  });
  return docRef.id;
};

// Cập nhật bài đăng
export const updatePost = async (postId: string, data: Partial<PostModel>): Promise<void> => {
  const ref = FirebaseDb.collection('posts').doc(postId); // Sử dụng FirebaseDb.collection và doc
  await ref.update({
    ...data,
    updatedAt: new Date().toISOString(),
  });
};

// Lấy bài đăng theo ID
export const getPostById = async (postId: string): Promise<PostModel | null> => {
  const ref = FirebaseDb.collection('posts').doc(postId);
  const snapshot = await ref.get();
  return snapshot.exists ? ({ id: postId, ...snapshot.data() } as PostModel) : null;
};

// Lấy danh sách bài đăng của người dùng
export const getUserPosts = async (userId: string): Promise<PostModel[]> => {
  const q = FirebaseDb.collection('posts').where('userId', '==', userId); // Sử dụng FirebaseDb.collection và where
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostModel));
}

export const getAllPost = async (): Promise<PostModel[]> => {
  const q = FirebaseDb.collection('posts');
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostModel));
};

// Xóa bài đăng
export const deletePost = async (postId: string): Promise<void> => {
  const ref = FirebaseDb.collection('posts').doc(postId); // Sử dụng FirebaseDb.collection và doc
  await ref.delete();
};
