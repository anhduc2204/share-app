// src/api/user.js

import { FirebaseDb } from './firebaseConfig';

export const createUser = async (user) => {
  const ref = FirebaseDb.collection('users').doc(user.uid);
  await ref.set({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const getUser = async (uid) => {
  const ref = FirebaseDb.collection('users').doc(uid);
  const snapshot = await ref.get();
  return snapshot.exists ? snapshot.data() : null;
};

export const updateUser = async (uid, data) => {
  const ref = FirebaseDb.collection('users').doc(uid);
  await ref.update({
    ...data,
    updatedAt: new Date(),
  });
};

// src/api/posts.js



// src/api/requests.js


// (Saved, Chat, Message, Notification tiếp theo...)
