import { FlatList } from 'react-native';
import React from 'react';
import { ContactListItem } from '../components/ChatListItem/ContactListItem';
import chats from '../../assets/data/chats.json';

const ContactsScreen = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ContactListItem chatId={item.id} user={item.user} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
