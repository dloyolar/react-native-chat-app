import { FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ChatListItem } from '../components/ChatListItem';
import { AuthContext } from '../context/AuthProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import * as Contacts from 'expo-contacts';

const ChatsScreen = () => {
  const { auth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    let contacts = null;
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          contacts = data;
        }
      }
    };

    getContacts();

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
