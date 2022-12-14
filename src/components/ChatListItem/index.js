import { Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { ChatListImage } from './ChatListImage';

dayjs.extend(relativeTime);

const StyledListItem = styled(List.Item)`
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
`;

export const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { id: chat.id, name: chat.name })}>
      <StyledListItem
        title={chat.name}
        titleStyle={{ fontWeight: 'bold' }}
        description={chat.lastMessage || ''}
        descriptionNumberOfLines={1}
        descriptionEllipsizeMode="tail"
        left={() => (
          <ChatListImage imageUrl={chat.image || 'https://freesvg.org/img/Female-Avatar-5.png'} />
        )}
        right={() => (
          <Text style={{ color: 'gray' }}>
            {dayjs(chat?.lastMessage?.createdAt).fromNow(true) || ''}
          </Text>
        )}
      />
    </TouchableOpacity>
  );
};
