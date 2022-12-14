import { FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ChatListItem } from '../components/ChatListItem';
import { AuthContext } from '../context/AuthProvider';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../services/firebase';

const ChatsScreen = () => {
  const { auth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  console.log({ auth });

  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(collection(firestore, '/chats'), where('phones', 'array-contains', auth)),
      (snapshot) => {
        const firestoreChats = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.phones[0] === auth ? data.phones[1] : data.phones[0],
            lastMessage: data.lastMessage,
          };
        });
        console.log({ firestoreChats });
        setChats(firestoreChats);
      }
    );

    return () => {
      unsuscribe();
    };
  }, [auth]);

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ChatsScreen;
