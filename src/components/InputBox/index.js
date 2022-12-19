import { Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { Container, Input, SendButton } from './ui';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { firestore, storage } from '../../services/firebase';
import { addDoc, collection } from 'firebase/firestore';

const uploadImage = async (uri, auth, chatId) => {
  const extension = uri.split('.').slice(-1)[0];
  const path = 'chats/' + chatId + '/' + new Date().toISOString() + '.' + extension;
  const imageRef = ref(storage, path);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  await uploadBytes(imageRef, blob);

  addDoc(collection(firestore, 'chats', chatId, 'messages'), {
    content: path,
    createdAt: new Date(),
    phone: auth,
    type: 'image',
  });
};

export const InputBox = ({ onNewMessage, auth, chatId }) => {
  const { control, handleSubmit, formState, reset } = useForm();

  const onSend = handleSubmit((data) => {
    const newMessage = data.newMessage.trim();
    onNewMessage(newMessage);
    Keyboard.dismiss();
    reset();
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Necesitamos permiso para acceder a tus imágenes');
      return;
    }

    const media = await ImagePicker.launchImageLibraryAsync();

    if (media.canceled) {
      console.log('cancelled');
      return;
    }

    console.log(media.assets[0].uri);
    console.log({ auth });
    console.log({ chatId });

    await uploadImage(media.assets[0].uri, auth, chatId);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Necesitamos los permisos');
      return;
    }

    const media = await ImagePicker.launchCameraAsync();
    if (media.canceled) {
      return;
    }
    await uploadImage(media.assets[0].uri, auth, chatId);
  };

  return (
    <Container>
      <IconButton icon="attachment" color="royalblue" size={24} onPress={pickImage} />

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

      <IconButton icon="camera" color="royalblue" size={24} onPress={takePhoto} />
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
