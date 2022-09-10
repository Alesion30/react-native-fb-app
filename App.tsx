import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userApi } from './src/api/user';
import { User } from './src/domains/user';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // DBからユーザー一覧を取得
    userApi.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>ユーザー一覧</Text>
        {users.map((user, i) => {
          return <Text>{i}: {user.name}</Text>;
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
