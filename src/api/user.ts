import { collection, getDocs } from 'firebase/firestore';
import { User } from '../domains/user';
import { db } from '../services/firebase';

const userCollectionRef = collection(db, 'users');

type UserApi = {
  getUsers: () => Promise<User[]>;
};

export const userApi: UserApi = {
  // ユーザー一覧を取得
  getUsers: async () => {
    const snap = await getDocs(userCollectionRef);
    const users: User[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? '未設定',
        age: data.age ?? null,
      };
    });
    return users;
  },
};
