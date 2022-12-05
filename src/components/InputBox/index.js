import { useState } from 'react';
import { Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Container, Input, SendButton } from './ui';

export const InputBox = () => {
  const [newMessage, setNewMessage] = useState('');

  const onSend = () => {
    console.warn('Sending new message: ', newMessage);
    Keyboard.dismiss();
    setNewMessage('');
  };

  return (
    <Container>
      <IconButton icon="plus" color="royalblue" size={24} onPress={() => console.log('Pressed')} />

      <Input placeholder="Escribe un mensaje..." value={newMessage} onChangeText={setNewMessage} />

      <SendButton onPress={onSend} icon="send" color="white" size={24} />
    </Container>
  );
};
