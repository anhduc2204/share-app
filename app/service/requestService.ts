import { FirebaseDb } from './firebaseConfig'; // Import FirebaseDb đã cấu hình
import { RequestModel } from '../models/schema';

// Gửi yêu cầu
export const sendRequest = async (data: RequestModel): Promise<string> => {
  const ref = FirebaseDb.collection('requests');
  const docRef = await ref.add({
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return docRef.id;
};

// Cập nhật yêu cầu
export const updateRequest = async (requestId: string, status: string, responseMessage: string = ''): Promise<void> => {
  const ref = FirebaseDb.collection('requests').doc(requestId);
  await ref.update({
    status,
    responseMessage,
    updatedAt: new Date().toISOString(),
  });
};

// Lấy yêu cầu theo bài đăng
export const getPostRequests = async (postId: string): Promise<RequestModel[]> => {
  const q = FirebaseDb.collection('requests').where('postId', '==', postId);
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RequestModel));
};

// Lấy yêu cầu của người dùng
export const getUserRequests = async (userId: string, sent: boolean = true): Promise<RequestModel[]> => {
  const field = sent ? 'requesterId' : 'ownerId';
  const q = FirebaseDb.collection('requests').where(field, '==', userId);
  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RequestModel));
};
