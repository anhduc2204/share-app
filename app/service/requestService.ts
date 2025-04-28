import { FirebaseDb } from './firebaseConfig'; // Import FirebaseDb đã cấu hình
import { PostModel, RequestModel } from '../models/schema';
import { getPostById, updatePost } from './postService';

// Gửi yêu cầu
export const sendRequest = async (requestModel: RequestModel, postModel: PostModel): Promise<string> => {
  const ref = FirebaseDb.collection('requests');
  const docRef = await ref.add({
    ...requestModel,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const requestCount = postModel.requestCount ? (postModel.requestCount + 1) : 1;
  const requesterList = postModel.requesterList ? [...postModel.requesterList, requestModel.requesterId] : [requestModel.requesterId]
  await updatePost(postModel.id || '', {
    ...postModel,
    requestCount: requestCount,
    requesterList: requesterList,
  })
  return docRef.id;
};

// Cập nhật yêu cầu
export const updateRequest = async (requestId: string, responseStatus: string, responseMessage: string = ''): Promise<void> => {
  const ref = FirebaseDb.collection('requests').doc(requestId);
  
  // Lấy dữ liệu yêu cầu hiện tại
  const requestSnapshot = await ref.get();
  if (!requestSnapshot.exists) {
    throw new Error('Request not found');
  }
  const requestData = requestSnapshot.data() as RequestModel;

  // Cập nhật trạng thái yêu cầu
  await ref.update({
    responseStatus,
    status: responseStatus === 'accept' ? 'progressing' : 'completed',
    responseMessage,
    updatedAt: new Date().toISOString(),
  });

  // Nếu yêu cầu được "accept" thì cập nhật bài đăng
  if (responseStatus === 'accept') {
    const post = await getPostById(requestData.postId);
    if (!post) {
      throw new Error('Post not found');
    }

    await updatePost(post.id || '', {
      status: 'completed',
      recipientId: requestData.requesterId,
      updatedAt: new Date().toISOString(),
    });
  }
};
export const updateRequestComplete = async (requestId: string): Promise<void> => {
  const ref = FirebaseDb.collection('requests').doc(requestId);
  
  // Lấy dữ liệu yêu cầu hiện tại
  const requestSnapshot = await ref.get();
  if (!requestSnapshot.exists) {
    throw new Error('Request not found');
  }
  // const requestData = requestSnapshot.data() as RequestModel;

  // Cập nhật trạng thái kết thúc yêu cầu
  await ref.update({
    status: 'completed',
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
