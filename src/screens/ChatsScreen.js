import { FlatList, Linking, Text, View } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ChatListItem } from '../components/ChatListItem';
import { AuthContext } from '../context/AuthProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import * as Contacts from 'expo-contacts';
import { Button } from 'react-native-paper';

const ChatsScreen = () => {
  const { auth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    void checkPermissions();
    if (!hasPermissions) return;
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
            name: contact ? `${contact.firstName}` : data.phones[1],
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
  }, [auth, hasPermissions]);

  const checkPermissions = async () => {
    const { granted } = await Contacts.getPermissionsAsync();
    if (!granted) return;
    setHasPermissions(true);
  };

  const askPermissions = async () => {
    const res = await Contacts.requestPermissionsAsync();
    if (res.status === 'granted') return setHasPermissions(true);
    Linking.openSettings();
  };

  const sortMessages = (messages) => {
    const msgs = messages.sort((a, b) => {
      const firstDate = a.lastUpdate ? new Date(a.lastUpdate * 1000).toISOString() : '';
      const secondDate = b.lastUpdate ? new Date(b.lastUpdate * 1000).toISOString() : '';
      return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
    });
    return msgs;
  };

  if (!hasPermissions) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Necesitas otorgar permisos para utilizar la App</Text>

        <Button icon="key" mode="outlined" onPress={askPermissions}>
          Dar permisos
        </Button>
      </View>
    );
  }
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ChatsScreen;
