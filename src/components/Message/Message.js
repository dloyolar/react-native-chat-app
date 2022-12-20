import { Text } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AuthContext } from '../../context/AuthProvider';
import { useContext } from 'react';
import { Container, styles, TimeText } from './ui';
dayjs.extend(relativeTime);

export const Message = (props) => {
  const { auth } = useContext(AuthContext);
  const { phone, content, createdAt } = props;
  const isMyMessage = () => {
    return phone === auth;
  };

  return (
    <Container
      color={isMyMessage() ? '#DCF8C5' : undefined}
      me={isMyMessage() ? 'flex-end' : undefined}
      style={styles.shadow}
    >
      <Text>{content}</Text>
      <TimeText>{dayjs(new Date(createdAt.seconds * 1000).toISOString()).fromNow(true)}</TimeText>
    </Container>
  );
};
