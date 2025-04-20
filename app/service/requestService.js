import { FirebaseDb } from './firebaseConfig';

export const sendRequest = async (data) => {
  const ref = collection(db, 'requests');
  const docRef = await addDoc(ref, {
    ...data,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const updateRequest = async (requestId, status, responseMessage = '') => {
  const ref = doc(db, 'requests', requestId);
  await updateDoc(ref, {
    status,
    responseMessage,
    updatedAt: new Date(),
  });
};

export const getPostRequests = async (postId) => {
  const q = query(collection(db, 'requests'), where('postId', '==', postId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserRequests = async (userId, sent = true) => {
  const field = sent ? 'requesterId' : 'ownerId';
  const q = query(collection(db, 'requests'), where(field, '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};