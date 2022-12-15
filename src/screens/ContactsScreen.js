import { FlatList } from 'react-native';
import React, { useContext } from 'react';
import { ContactListItem } from '../components/ChatListItem/ContactListItem';
import chats from '../../assets/data/chats.json';
import { useContacts } from '../hooks/useContacts';
import { AuthContext } from '../context/AuthProvider';
import { addDoc, collection, getDoc, getDocs, query, setDoc, where, doc } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

const ContactsScreen = () => {
  const contacts = useContacts();
  const { auth } = useContext(AuthContext);
  const navigation = useNavigation();

  const navigateToChat = async (phoneNumber, name) => {
    const documents = await getDocs(
      query(collection(firestore, 'chats'), where('phones', 'array-contains', auth))
    );
    const prevChat = documents.docs
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      .find((doc) => doc.phones.includes(phoneNumber));

    if (!prevChat) {
      const newChat = await addDoc(collection(firestore, 'chats'), {
        phones: [phoneNumber, auth],
      });

      setDoc(
        doc(firestore, 'chats', newChat.id),
        {
          lastUpdate: new Date(),
        },
        { merge: true }
      );

      navigation.navigate('Chat', { id: newChat.id, name });
      return;
    }
    navigation.navigate('Chat', { id: prevChat.id, name });
  };

  return (
    <FlatList
      data={contacts}
      renderItem={({ item }) => (
        <ContactListItem
          user={item}
          navigate={() =>
            navigateToChat(item.phoneNumbers[0].number, `${item.firstName} ${item.lastName ?? ''}`)
          }
        />
      )}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
