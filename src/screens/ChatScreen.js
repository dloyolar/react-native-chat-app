import { ImageBackground, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import styled from '@emotion/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import messages from '../../assets/data/messages.json';
import bg from '../../assets/images/wsp-bg.png';
import { Message } from '../components/Message';
import { InputBox } from '../components/InputBox';
import { useEffect } from 'react';

const ImageBG = styled(ImageBackground)`
  flex: 1;
`;

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 90}
      style={{ flex: 1 }}
    >
      <ImageBG source={bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={{ padding: 10 }}
          inverted
        />
        <InputBox />
      </ImageBG>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
