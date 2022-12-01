import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import styled from '@emotion/native';

const StyledView = styled(View)`
  align-items: center;
  justify-content: start;
`;

export const ChatListImage = ({ imageUrl }) => {
  return (
    <StyledView>
      <Avatar.Image
        size={60}
        source={{
          uri: imageUrl,
        }}
      />
    </StyledView>
  );
};
