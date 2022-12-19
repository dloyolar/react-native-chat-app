import { FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ChatListItem } from '../components/ChatListItem';
import { AuthContext } from '../context/AuthProvider';
import { collection, getDocs, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { useContacts } from '../hooks/useContacts';

const ChatsScreen = () => {
  const { auth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const contacts = useContacts();

  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(collection(firestore, '/chats'), where('phones', 'array-contains', auth)),
      (snapshot) => {
        const firestoreChats = snapshot.docs.map((doc) => {
          const data = doc.data();

          const otherPhone = data.phones.find((e) => e !== auth);
          const contact = contacts.find((e) => e.phoneNumbers[0].number == otherPhone);

          return {
            id: doc.id,
            name: contact ? `${contact.firstName}` : data.phones[0],
            lastMessage: data.lastMessage,
            lastUpdate: data.lastUpdate,
          };
        });

        sortMessages(firestoreChats);

        setChats(firestoreChats);
      }
    );

    return () => {
      unsuscribe();
    };
  }, [auth]);

  const sortMessages = (messages) => {
    const msgs = messages.sort((a, b) => {
      const firstDate = a.lastUpdate ? new Date(a.lastUpdate * 1000).toISOString() : '';
      const secondDate = b.lastUpdate ? new Date(b.lastUpdate * 1000).toISOString() : '';
      return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
    });
    return msgs;
  };

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ChatsScreen;
