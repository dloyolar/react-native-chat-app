import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firestore, storage } from '../services/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export const uploadImage = async (uri, auth, chatId) => {
  const extension = uri.split('.').slice(-1)[0];
  const path = 'chats/' + chatId + '/' + auth + new Date().toISOString() + '.' + extension;
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

  setDoc(
    doc(firestore, 'chats', chatId),
    {
      lastMessage: 'Imagen',
    },
    { merge: true }
  );
};

export const pickImage = async (auth, chatId) => {
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

export const takePhoto = async (auth, chatId) => {
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
