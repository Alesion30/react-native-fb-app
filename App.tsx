import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { userApi } from './src/api/user';
import { User } from './src/domains/user';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');

  useEffect(() => {
    // DBからユーザー一覧を取得
    userApi.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  // ユーザーをDBに登録
  const createUser = async () => {
    if (name === '') Alert.alert('名前を入力してください')
    const _age = age ? parseInt(age) : undefined;
    userApi.createUser(name, _age);

    onChangeName('');
    onChangeAge('');
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>ユーザー一覧</Text>
        {users.map((user, i) => {
          return (
            <Text>
              {i}: {user.name} {user.age ?? '??'}歳
            </Text>
          );
        })}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="名前を入力"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAge}
            value={age}
            keyboardType='numeric'
            placeholder="年齢を入力"
          />
          <Button title="追加する" onPress={createUser} />
        </View>
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
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: 250,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
  },
});
