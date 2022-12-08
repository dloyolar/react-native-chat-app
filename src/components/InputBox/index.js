import { Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { Container, Input, SendButton } from './ui';

export const InputBox = ({ onNewMessage }) => {
  const { control, handleSubmit, formState, reset } = useForm();

  const onSend = handleSubmit((data) => {
    const newMessage = data.newMessage.trim();
    onNewMessage(newMessage);
    Keyboard.dismiss();
    reset();
  });

  return (
    <Container>
      <IconButton icon="plus" color="royalblue" size={24} onPress={() => console.log('Pressed')} />

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 200,
          validate: (value) => !!value.trim(),
        }}
        name="newMessage"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Escribe un mensaje..."
          />
        )}
      />

      <SendButton
        onPress={onSend}
        icon="send"
        color="white"
        size={24}
        disabled={!formState.isValid}
      />
    </Container>
  );
};
