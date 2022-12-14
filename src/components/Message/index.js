import { View, Text, StyleSheet } from 'react-native';
import styled from '@emotion/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AuthContext } from '../../context/AuthProvider';
import { useContext } from 'react';
dayjs.extend(relativeTime);

const Container = styled(View)`
  background-color: ${(props) => props.color ?? 'white'};
  align-self: ${(props) => props.me ?? 'flex-start'};
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
`;

const TimeText = styled(Text)`
  color: gray;
  align-self: flex-end;
`;

export const Message = ({ message }) => {
  const { auth } = useContext(AuthContext);
  const isMyMessage = () => {
    return message.phone === auth;
  };

  return (
    <Container
      color={isMyMessage() ? '#DCF8C5' : undefined}
      me={isMyMessage() ? 'flex-end' : undefined}
      style={styles.shadow}
    >
      <Text>{message.content}</Text>
      <TimeText>
        {dayjs(new Date(message.createdAt.seconds * 1000).toISOString()).fromNow(true)}
      </TimeText>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
