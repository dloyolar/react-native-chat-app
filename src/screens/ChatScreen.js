import { ImageBackground, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import styled from '@emotion/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import bg from '../../assets/images/wsp-bg.png';
import { Message } from '../components/Message';
import { InputBox } from '../components/InputBox';
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { AuthContext } from '../context/AuthProvider';

const ImageBG = styled(ImageBackground)`
  flex: 1;
`;

const ChatScreen = () => {
  const { auth } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [allMessages, setAllMessages] = useState([]);
  const chatId = route.params.id;

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params]);

  useEffect(
    function listenToChats() {
      const unsuscribe = onSnapshot(
        query(collection(firestore, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc')),
        (snapshot) => {
          const firestoreMessages = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setAllMessages(firestoreMessages);
        }
      );
      return () => {
        unsuscribe();
      };
    },
    [chatId]
  );

  const onNewMessage = (message) => {
    console.log({ message });
    addDoc(collection(firestore, 'chats', chatId, 'messages'), {
      content: message,
      createdAt: new Date(),
      phone: auth,
      type: 'text',
    });

    setDoc(
      doc(firestore, 'chats', chatId),
      {
        lastMessage: message,
      },
      { merge: true }
    );
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
      <InputBox onNewMessage={onNewMessage} auth={auth} chatId={chatId} />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
