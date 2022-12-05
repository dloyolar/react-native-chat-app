import styled from '@emotion/native';
import { View, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';

export const Container = styled(View)`
  flex-direction: row;
  background: whitesmoke;
  padding: 5px 10px 20px;
  align-items: center;
`;

export const Input = styled(TextInput)`
  flex: 1;
  background-color: white;
  padding: 5px 10px;
  border-radius: 50px;
  margin: 0 5px;
  border-color: lightgray;
  border-width: 1px;
  height: 40px;
  font-size: 14px;
`;

export const SendButton = styled(IconButton)`
  background-color: royalblue;
  padding: 7px;
  border-radius: 20px;
  overflow: hidden;
`;
