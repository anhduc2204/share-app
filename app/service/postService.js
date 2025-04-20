import { FirebaseDb } from './firebaseConfig';

export const createPost = async (postData) => {
  const ref = collection(db, 'posts');
  const docRef = await addDoc(ref, {
    ...postData,
    viewCount: 0,
    saveCount: 0,
    requestCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const updatePost = async (postId, data) => {
  const ref = doc(db, 'posts', postId);
  await updateDoc(ref, {
    ...data,
    updatedAt: new Date(),
  });
};

export const getPostById = async (postId) => {
  const ref = doc(db, 'posts', postId);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { id: postId, ...snapshot.data() } : null;
};

export const getUserPosts = async (userId) => {
  const q = query(collection(db, 'posts'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deletePost = async (postId) => {
  const ref = doc(db, 'posts', postId);
  await deleteDoc(ref);
};