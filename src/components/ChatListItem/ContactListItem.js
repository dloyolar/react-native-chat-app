import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { ChatListImage } from './ChatListImage';

const StyledListItem = styled(List.Item)`
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
`;

export const ContactListItem = ({ user, chatId }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { id: chatId, name: user.name })}>
      <StyledListItem
        title={user.name}
        titleStyle={{ fontWeight: 'bold' }}
        description={user?.status}
        left={() => <ChatListImage imageUrl={user.image} />}
      />
    </TouchableOpacity>
  );
};
