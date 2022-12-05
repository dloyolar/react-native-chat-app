import { ImageBackground, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import styled from '@emotion/native';
import messages from '../../assets/data/messages.json';
import bg from '../../assets/images/wsp-bg.png';
import { Message } from '../components/Message';
import { InputBox } from '../components/InputBox';

const ImageBG = styled(ImageBackground)`
  flex: 1;
  padding-top: 60px;
`;

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
