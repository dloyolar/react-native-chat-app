import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AuthContext } from '../../context/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { Container, StyledImage, styles, TimeText } from './ui';

dayjs.extend(relativeTime);

export const ImageMessage = (props) => {
  const { auth } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const { content, createdAt, phone } = props;

  useEffect(() => {
    loadImageFromStorage();
  }, [content]);

  const loadImageFromStorage = async () => {
    const imageRef = ref(storage, content);
    const url = await getDownloadURL(imageRef);
    setImage(url);
  };

  const isMyMessage = () => {
    return phone === auth;
  };

  return (
    <Container
      color={isMyMessage() ? '#DCF8C5' : undefined}
      me={isMyMessage() ? 'flex-end' : undefined}
      style={styles.shadow}
    >
      {image ? <StyledImage source={{ uri: image }} /> : <ActivityIndicator />}
      <TimeText>{dayjs(new Date(createdAt.seconds * 1000).toISOString()).fromNow(true)}</TimeText>
    </Container>
  );
};
