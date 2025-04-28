import { UserModel } from '../models/schema';
import { FirebaseDb } from './firebaseConfig';

export const createUser = async (user: UserModel) => {
  const ref = FirebaseDb.collection('users').doc(user.uid);
  await ref.set({
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

export const getUser = async (uid: string) => {
  const ref = FirebaseDb.collection('users').doc(uid);
  const snapshot = await ref.get();
  return snapshot.exists ? (snapshot.data() as UserModel) : null;
};

export const updateUser = async (uid: string, data: Partial<UserModel>) => {
  const ref = FirebaseDb.collection('users').doc(uid);
  await ref.update({
    ...data,
    updatedAt: new Date().toISOString(),
  });
};
