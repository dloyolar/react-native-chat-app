import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { ChatListImage } from './ChatListImage';

const StyledListItem = styled(List.Item)`
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
`;

export const ContactListItem = ({ user, navigate }) => {
  return (
    <TouchableOpacity onPress={() => navigate()}>
      <StyledListItem
        title={`${user.firstName} ${user.lastName ?? ''}`}
        titleStyle={{ fontWeight: 'bold' }}
        description={user?.status || ''}
        left={() => (
          <ChatListImage imageUrl={user.image || 'https://freesvg.org/img/Female-Avatar-5.png'} />
        )}
      />
    </TouchableOpacity>
  );
};
