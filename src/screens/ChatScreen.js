import { ImageBackground, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import styled from '@emotion/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import messages from '../../assets/data/messages.json';
import bg from '../../assets/images/wsp-bg.png';
import { Message } from '../components/Message';
import { InputBox } from '../components/InputBox';
import { useEffect, useState } from 'react';

const ImageBG = styled(ImageBackground)`
  flex: 1;
`;

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params]);

  useEffect(() => {
    sortMessages();
  }, []);

  const sortMessages = () => {
    const msgs = messages.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    });
    setAllMessages([...msgs]);
  };

  const onNewMessage = (message) => {
    console.log({ message });
    const tempMessage = {
      id: Date.now(),
      text: message,
      createdAt: new Date().toISOString(),
      user: {
        id: 'u1',
        name: 'Vadim',
      },
    };

    setAllMessages([tempMessage, ...allMessages]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
      style={{ flex: 1 }}
    >
      <ImageBG source={bg}>
        <FlatList
          data={allMessages}
          renderItem={({ item }) => <Message message={item} />}
          style={{ padding: 10 }}
          inverted
          extraData={allMessages}
        />
      </ImageBG>
      <InputBox onNewMessage={onNewMessage} />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
