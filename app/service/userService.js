// src/api/user.js

import { db } from '../services/firebaseConfig';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

export const createUser = async (user) => {
  const ref = doc(db, 'users', user.uid);
  await setDoc(ref, {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const getUser = async (uid) => {
  const ref = doc(db, 'users', uid);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};

export const updateUser = async (uid, data) => {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    ...data,
    updatedAt: new Date(),
  });
};

// src/api/posts.js

import { db } from '../services/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';

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

// src/api/requests.js

import { db } from '../services/firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';

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

// (Saved, Chat, Message, Notification tiếp theo...)
